export default function asyncTestJasmine(callback) {
  return done => {
    callback().then(done, error => done.fail(error.message))
  }
}
