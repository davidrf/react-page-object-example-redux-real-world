export default function createResponse({ body, status = 200, delay = 0, headers }) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ body, status, headers }), delay)
  })
}
