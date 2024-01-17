## Adding custom validator function

To add a custom validator function to a field you can add an object to the validators array like below. AbstractControl is the AbstractControl type from Angular and will be passed to this validator function.

```js
{
  name: 'someValidationName',
  message: 'This field is invalid,
  fnc: (control: AbstractControl) => {
    if (control.value.length !== 10) {
      return {
        'someValidationName': true
      }
    } else {
      return null;
    }
  }
}
```