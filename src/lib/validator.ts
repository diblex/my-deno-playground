export function validateCreate(body: any, model: any) {
  const fields = Object.assign({}, model.fields);
  const defaults = Object.assign({}, model.defaults);
  delete fields.id;
  let errors = [];
  for (let key in fields) {
    const field = fields[key];
    let fieldType = typeof field === 'string' ? field : field.type;
    fieldType = fieldType === 'text' ? 'string' : fieldType;
    const bodyType = typeof body[key];
    let errorMsg;
    if (body[key] == null) {
      if (defaults[key] == null) {
        errorMsg = `Missing ${key} parameter in request body`;
      }
    } else if (bodyType !== fieldType) {
      errorMsg = `Invalid ${bodyType} type for ${key}, expected ${fieldType}`;
    } else if (hasLengthRule(field) && body[key].length > field.length) {
      errorMsg = `Invalid value, maximun lenght allowed is ${field.length}`;
    }
    if (errorMsg) {
      const error = {} as any;
      error[key] = errorMsg;
      errors.push(error);
    }
  }
  return {
    valid: !Boolean(errors.length),
    errors
  }
}

function hasLengthRule(field: any) {
  return typeof field !== 'string' && field?.type === 'string' && field?.length;
}
