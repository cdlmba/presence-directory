import {
  INTRO,
  Q4_HEADING,
  Q4_SCALE,
  QUESTIONS,
  RESULT_OPTIONS,
  ROUTE_CTA,
  SABBATH_NOTE,
  STEPS,
  SUBSTACK_CHECKBOX,
  buildMailto,
  evaluateAudit,
  postAuditToGoogleSheet,
  questionById,
  verifyAuditLogic,
  type AnswerValue,
  type AuditAnswers,
  type AuditSubmission,
  type ContactFields,
  type Question,
} from '../lib/audit';

verifyAuditLogic();

const Q4_IDS = new Set(['q4a', 'q4b', 'q4c', 'q4d']);

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  children: Array<Node | string> = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else node.setAttribute(key, value);
  }
  for (const child of children) {
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

function fieldId(questionId: string) {
  return `audit-${questionId}`;
}

function renderLong(question: Extract<Question, { type: 'long' }>, current?: AnswerValue) {
  const input = el('textarea', {
    id: fieldId(question.id),
    name: question.id,
    rows: '4',
    ...(question.required ? { required: 'true' } : {}),
  });
  if (current?.label) input.value = current.label;
  return wrapField(question, input);
}

function renderChoice(question: Extract<Question, { type: 'choice' }>, current?: AnswerValue) {
  const group = el('div', { class: 'quiz-options', role: 'radiogroup', 'aria-labelledby': `${fieldId(question.id)}-label` });
  for (const option of question.options) {
    const optionId = `${fieldId(question.id)}-${option.label.slice(0, 24).replace(/\W+/g, '-')}`;
    const input = el('input', {
      type: 'radio',
      name: question.id,
      id: optionId,
      value: option.label,
    });
    if (typeof option.points === 'number') input.dataset.points = String(option.points);
    if (current?.label === option.label) input.checked = true;
    const label = el('label', { class: 'quiz-option', for: optionId }, [input, el('span', {}, [option.label])]);
    group.append(label);
  }
  return wrapField(question, group, `${fieldId(question.id)}-label`);
}

function renderScale(
  question: Extract<Question, { type: 'scale' }>,
  current?: AnswerValue,
  compact = false,
) {
  const group = el('div', { class: 'quiz-scale', role: 'radiogroup', 'aria-labelledby': `${fieldId(question.id)}-label` });
  if (!compact) group.append(el('span', { class: 'quiz-scale-end' }, [question.lowLabel]));
  const ticks = el('div', { class: 'quiz-scale-ticks' });
  for (let n = 1; n <= 5; n += 1) {
    const optionId = `${fieldId(question.id)}-${n}`;
    const input = el('input', {
      type: 'radio',
      name: question.id,
      id: optionId,
      value: String(n),
    });
    input.dataset.points = String(n);
    if (current?.points === n) input.checked = true;
    const label = el('label', { class: 'quiz-tick', for: optionId }, [input, el('span', {}, [String(n)])]);
    ticks.append(label);
  }
  group.append(ticks);
  if (!compact) group.append(el('span', { class: 'quiz-scale-end' }, [question.highLabel]));
  return wrapField(question, group, `${fieldId(question.id)}-label`);
}

function wrapField(question: Question, control: HTMLElement, labelId = `${fieldId(question.id)}-label`) {
  const field = el('fieldset', { class: 'quiz-field', 'data-question': question.id });
  const legend = el('legend', { id: labelId }, [question.prompt]);
  if (question.required) legend.append(el('span', { class: 'req' }, [' (required)']));
  field.append(legend);
  if (question.helper) field.append(el('p', { class: 'quiz-helper' }, [question.helper]));
  field.append(control);
  return field;
}

function renderQuestion(question: Question, answers: AuditAnswers, compactScale = false) {
  const current = answers[question.id];
  if (question.type === 'long') return renderLong(question, current);
  if (question.type === 'choice') return renderChoice(question, current);
  return renderScale(question, current, compactScale);
}

function readQuestion(question: Question, root: HTMLElement): AnswerValue | undefined {
  if (question.type === 'long') {
    const area = root.querySelector<HTMLTextAreaElement>(`#${fieldId(question.id)}`);
    const text = area?.value.trim() ?? '';
    if (!text) return undefined;
    return { label: text };
  }
  const selected = root.querySelector<HTMLInputElement>(`input[name="${question.id}"]:checked`);
  if (!selected) return undefined;
  const points = selected.dataset.points ? Number(selected.dataset.points) : undefined;
  const label = question.type === 'scale' ? selected.value : selected.value;
  return { label, points };
}

function renderIntro(onStart: () => void) {
  const panel = el('section', { class: 'quiz-panel', 'aria-labelledby': 'audit-intro-title' });
  panel.append(el('p', { class: 'kicker' }, [INTRO.kicker]));
  panel.append(el('h1', { id: 'audit-intro-title' }, [INTRO.title]));
  panel.append(el('p', { class: 'muted' }, [INTRO.companion]));
  for (const paragraph of INTRO.body) {
    panel.append(el('p', {}, [paragraph]));
  }
  const start = el('button', { class: 'btn', type: 'button' }, [INTRO.button]);
  start.addEventListener('click', onStart);
  panel.append(el('div', { class: 'actions' }, [start]));
  return panel;
}

function renderContact(contact: ContactFields, onBack: () => void, onSubmit: () => void) {
  const panel = el('section', { class: 'quiz-panel', 'aria-labelledby': 'audit-contact-title' });
  panel.append(el('p', { class: 'kicker' }, ['Last screen']));
  panel.append(el('h2', { id: 'audit-contact-title', tabindex: '-1' }, ['How should I send your results?']));

  const form = el('div', { class: 'quiz-fields' });

  const name = el('input', { id: 'audit-firstName', name: 'firstName', type: 'text', autocomplete: 'given-name', required: 'true' });
  name.value = contact.firstName;
  form.append(labeled('First name (required)', 'audit-firstName', name));

  const email = el('input', { id: 'audit-email', name: 'email', type: 'email', autocomplete: 'email', required: 'true' });
  email.value = contact.email;
  form.append(labeled('Email (required to receive results)', 'audit-email', email));

  const phone = el('input', { id: 'audit-phone', name: 'phone', type: 'tel', autocomplete: 'tel' });
  phone.value = contact.phone;
  form.append(labeled('Phone (optional)', 'audit-phone', phone));

  const box = el('input', { id: 'audit-substack', name: 'substack', type: 'checkbox' });
  box.checked = contact.substack;
  const checkLabel = el('label', { class: 'quiz-check', for: 'audit-substack' }, [box, el('span', {}, [SUBSTACK_CHECKBOX])]);
  form.append(checkLabel);

  form.append(el('p', { class: 'quiz-helper' }, [SABBATH_NOTE]));
  panel.append(form);

  const error = el('p', { class: 'quiz-error', hidden: 'true', tabindex: '-1' });
  panel.append(error);

  const back = el('button', { class: 'btn btn-secondary', type: 'button' }, ['Back']);
  const next = el('button', { class: 'btn', type: 'button' }, ['See my snapshot']);
  back.addEventListener('click', onBack);
  next.addEventListener('click', onSubmit);
  panel.append(el('div', { class: 'actions' }, [back, next]));
  return panel;
}

function labeled(text: string, id: string, input: HTMLElement) {
  const wrap = el('label', { class: 'quiz-label', for: id }, [text]);
  const field = el('div', { class: 'quiz-field' }, [wrap, input]);
  return field;
}

function renderStep(
  stepIndex: number,
  answers: AuditAnswers,
  onBack: () => void,
  onNext: () => void,
) {
  const step = STEPS[stepIndex];
  const panel = el('section', { class: 'quiz-panel', 'aria-labelledby': 'audit-step-title' });
  panel.append(el('p', { class: 'kicker' }, [`Section ${stepIndex} of ${STEPS.length - 1}`]));
  panel.append(el('h2', { id: 'audit-step-title', tabindex: '-1' }, [step.title]));

  const ids = [...step.questionIds];
  const fields = el('div', { class: 'quiz-fields' });
  let q4HeadingPlaced = false;
  for (const id of ids) {
    if (Q4_IDS.has(id) && !q4HeadingPlaced) {
      fields.append(el('p', { class: 'quiz-group-heading' }, [Q4_HEADING]));
      fields.append(
        el('p', { class: 'quiz-helper' }, [
          `${Q4_SCALE.lowLabel}. ${Q4_SCALE.midLabel}. ${Q4_SCALE.highLabel}.`,
        ]),
      );
      q4HeadingPlaced = true;
    }
    fields.append(renderQuestion(questionById(id), answers, Q4_IDS.has(id)));
  }
  panel.append(fields);

  const error = el('p', { class: 'quiz-error', hidden: 'true', tabindex: '-1' });
  panel.append(error);

  const back = el('button', { class: 'btn btn-secondary', type: 'button' }, [stepIndex === 1 ? 'Back to start' : 'Back']);
  const next = el('button', { class: 'btn', type: 'button' }, ['Continue']);
  back.addEventListener('click', onBack);
  next.addEventListener('click', onNext);
  panel.append(el('div', { class: 'actions' }, [back, next]));
  return panel;
}

function renderResult(submission: AuditSubmission, mailto: string) {
  const { band, score, route } = submission;
  const lead = ROUTE_CTA[route];
  const panel = el('section', { class: 'quiz-panel quiz-result', 'aria-labelledby': 'audit-result-title' });
  panel.append(el('p', { class: 'kicker' }, [`Score ${score} of 45`]));
  panel.append(
    el('h2', { id: 'audit-result-title', tabindex: '-1' }, [`Band ${band.id} (${band.range}): ${band.name}`]),
  );
  for (const paragraph of band.paragraphs) {
    panel.append(el('p', {}, [paragraph]));
  }
  panel.append(el('p', {}, [el('strong', {}, ['Next step: ']), band.nextStep]));

  const leadBox = el('div', { class: 'quiz-lead' }, [
    el('p', { class: 'kicker' }, [`Your route: ${lead.tag}`]),
    el('p', {}, [lead.detail]),
    el('a', { class: 'btn', href: lead.href }, [lead.label]),
  ]);
  panel.append(leadBox);

  panel.append(el('h3', {}, ['Other next steps']));
  const also = el('ul', { class: 'quiz-also' });
  for (const option of RESULT_OPTIONS) {
    also.append(el('li', {}, [el('a', { href: option.href }, [option.label])]));
  }
  panel.append(also);

  panel.append(
    el('p', { class: 'quiz-helper' }, [
      'A copy of your answers is ready to send to Christopher. If your email client did not open, use the link below.',
    ]),
  );
  panel.append(el('p', {}, [el('a', { href: mailto }, ['Send answers by email'])]));
  panel.append(el('p', { class: 'quiz-helper' }, [SABBATH_NOTE]));
  return panel;
}

function collectStepAnswers(root: HTMLElement, ids: readonly string[]) {
  const next: AuditAnswers = {};
  const missing: string[] = [];
  for (const id of ids) {
    const question = questionById(id);
    const value = readQuestion(question, root);
    if (!value) {
      if (question.required) missing.push(question.prompt);
      continue;
    }
    next[id] = value;
  }
  return { next, missing };
}

function readContact(root: HTMLElement): { contact: ContactFields; missing: string[] } {
  const firstName = root.querySelector<HTMLInputElement>('#audit-firstName')?.value.trim() ?? '';
  const email = root.querySelector<HTMLInputElement>('#audit-email')?.value.trim() ?? '';
  const phone = root.querySelector<HTMLInputElement>('#audit-phone')?.value.trim() ?? '';
  const substack = Boolean(root.querySelector<HTMLInputElement>('#audit-substack')?.checked);
  const missing: string[] = [];
  if (!firstName) missing.push('First name');
  if (!email) missing.push('Email');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push('A valid email');
  return { contact: { firstName, email, phone, substack }, missing };
}

function showError(root: HTMLElement, missing: string[]) {
  const error = root.querySelector<HTMLElement>('.quiz-error');
  if (!error) return;
  if (missing.length === 0) {
    error.hidden = true;
    error.textContent = '';
    return;
  }
  error.hidden = false;
  error.textContent = `Please complete: ${missing.join('; ')}.`;
  error.focus?.();
}

function openMailto(url: string) {
  const link = el('a', { href: url });
  link.rel = 'noopener';
  document.body.append(link);
  link.click();
  link.remove();
}

export function mountAuditQuiz(root: HTMLElement) {
  let stepIndex = 0;
  const answers: AuditAnswers = {};
  let contact: ContactFields = { firstName: '', email: '', phone: '', substack: false };

  function paint() {
    root.replaceChildren();
    const progress = el('p', { class: 'quiz-progress muted' });
    if (stepIndex === 0) progress.textContent = 'Welcome';
    else if (stepIndex >= STEPS.length) progress.textContent = 'Your snapshot';
    else progress.textContent = `Question set ${stepIndex} of ${STEPS.length - 1}`;
    root.append(progress);

    if (stepIndex === 0) {
      root.append(
        renderIntro(() => {
          stepIndex = 1;
          paint();
        }),
      );
    } else if (stepIndex === STEPS.length - 1) {
      root.append(
        renderContact(
          contact,
          () => {
            stepIndex -= 1;
            paint();
          },
          () => {
            const read = readContact(root);
            contact = read.contact;
            showError(root, read.missing);
            if (read.missing.length) return;
            void finish();
          },
        ),
      );
    } else if (stepIndex >= STEPS.length) {
      return;
    } else {
      const currentIds = STEPS[stepIndex].questionIds;
      root.append(
        renderStep(
          stepIndex,
          answers,
          () => {
            stepIndex -= 1;
            paint();
          },
          () => {
            const collected = collectStepAnswers(root, currentIds);
            Object.assign(answers, collected.next);
            showError(root, collected.missing);
            if (collected.missing.length) return;
            stepIndex += 1;
            paint();
          },
        ),
      );
    }

    const heading = root.querySelector<HTMLElement>('h1, h2');
    heading?.focus();
  }

  async function finish() {
    const result = evaluateAudit(answers);
    const submission: AuditSubmission = { ...contact, ...result, answers };
    const mailto = buildMailto(submission);

    // TODO: POST submission to the Presence Audit Leads Google Sheet.
    // Route column should be DIY, GUIDED, or DFY. No backend is wired yet.
    await postAuditToGoogleSheet(submission);

    stepIndex = STEPS.length;
    root.replaceChildren();
    root.append(el('p', { class: 'quiz-progress muted' }, ['Your snapshot']));
    root.append(renderResult(submission, mailto));
    root.querySelector<HTMLElement>('h2')?.focus();
    openMailto(mailto);
  }

  paint();
}
