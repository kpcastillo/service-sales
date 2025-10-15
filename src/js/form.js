// /scripts/utils/form.js
export function formToObject(form) {
  const data = {};
  const fd = new FormData(form);

  for (const el of form.elements) {
    if (!el.name) continue;

    if (el.type === 'checkbox') {
      data[el.name] = el.checked;
    } else if (el.type === 'radio') {
      if (el.checked) data[el.name] = el.value;
      else if (!(el.name in data)) data[el.name] = '';
    } else {
      data[el.name] = fd.get(el.name) ?? '';
    }
  }
  return data;
}

export function populateForm(form, data = {}) {
  for (const el of form.elements) {
    if (!el.name || !(el.name in data)) continue;
    const val = data[el.name];

    if (el.type === 'checkbox') el.checked = !!val;
    else if (el.type === 'radio') el.checked = el.value === String(val);
    else el.value = val ?? '';
  }
}
