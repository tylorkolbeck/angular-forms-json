## Adding custom validator function

To add a custom validator function to a field you can add an object to the validators array like below. AbstractControl is the AbstractControl type from Angular and will be passed to this validator function.

To add a custom synchronous validator to a field add it to the synValidators object on the form schema like shown below.

```js
  syncValidators = {
    someGroup: {
      someField: [
        {
          name: 'someValidatorName',
          validator: (control: AbstractControl) => {
             if (control.value !== 'Some Value') {
                return { someValidatorName: 'Input needs to equal Some Value'}
              }
              return null;
          }
        }
      ]
    }
  }
```

Here is an example of adding an async validator.
```js
  asyncValidators = {
    someGroup: {
      someField: [
        {
          name: 'someValidatorName',
          validator: (control: AbstractControl) => {
             return of(true).pipe(map(res => ({asyncError: 'This is an async error'})))
          }
        }
      ]
    }
  }
```
