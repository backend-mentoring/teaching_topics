# Promises

```javascript
vincentPromiseLesson()
  .then(enjoyLesson)
  .catch(err => allonPromiseLessonPreparedBeforeClass())
  .catch(err => allonIsWritingPromiseJokesBecauseTheLessonIsNotReadyYet())
  .then(enjoyLesson);

function enjoyLesson(theLesson) {
  console.log('wow, promises are awesome!');
}
```
