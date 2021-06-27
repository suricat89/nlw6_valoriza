export default class Controller {
  sanitizeInput(input: unknown) {
    const output: unknown = {};
    Object.keys(input).forEach(key => {
      if (input[key] !== undefined && input[key] !== null) {
        output[key] = input[key];
      }
    });
    return output;
  }
}
