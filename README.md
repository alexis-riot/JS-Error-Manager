# JS Error Manager

JS Error Manager is a simple library to use with Laravel Validators. You can make simple forms using Ajax or Axios and this library manage all errors returned in JSON by Laravel.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install JS Error Manager.

```bash
npm i @alexisriot/js-error-manager --save
```
```js
require('@alexisriot/js-error-manager');
```

## Usage
```html
<form data-form-type="update-user" data-form-url="/api/user/1/">
    <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Enter your usernae">
    <input type="email" class="form-control" id="email" aria-describedby="email" placeholder="Enter your mail">
    <button type="submit" data-type-button="update-user" class="btn btn-primary float-right">Update</button>
</form>

<script>
    $(document).ready(function() {
        const request_name = "update-user";

        var form = $('[data-form-type="' + request_name + '"]');
        var btn = $('[data-type-button="' + request_name + '"]');

        btn.on('click', function(e) {
            e.preventDefault();
            progressButton(btn);

            axios.patch(form.data('form-url'), {
                'name': $('#name').val(),
                'email': $('#email').val(),
            })
            .then(successResponse)
            .catch(errorResponse);
        });
    });
</script>

```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[LIC](https://www.isc.org/licenses/)
