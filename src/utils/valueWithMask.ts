//Преобразуем число для отображения его в нужном формате
export const withMask = (value: number): string => Math.round(value).toLocaleString('en-US').replaceAll(',', ' ')