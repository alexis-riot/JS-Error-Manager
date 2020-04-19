# JS Error Manager

JS Error Manager is a simple library to use with Laravel Validators. You can make simple forms using Ajax or Axios and this library manage all errors returned in JSON by Laravel.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install JS Error Manager.

```bash
npm i @alexisriot/js-error-manager jquery toastr sweetalert2 --save
```
```js
window.$ = window.jQuery = require('jquery');
window.toastr = require('toastr');
window.Swal = require('sweetalert2');
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

Using this script you can easily send some data as JSON.

```php
class UserController extends Controller
{
    public function profile() {
        return view('Admin::user.profile')
            ->with('user', Auth::user());
    }

    public function profilePatch(PatchUserRequest $request) {
        return response()->json([
            'status' => 'success',
            'message' => 'The method has been created.',
            'reset' => true,
            'swal' => true,
            'redirect' => route('admin.user.profile'),
        ], 200);
    }
}
```

**PARAMETERS:**

- `status` allow you to set the type of your response _(success, error, info, danger...)_.

- `swal (optionnal)` allow you to use the Swal plugin instead of Toastr. The plugin Swal display a large window at the center of your screen instead of Toastr that he display a notification at the top-right of your screen. By default, the toastr is used.

- `redirect (optionnal)` allow you to redirect the user after 3 seconds. It show the message and redirect the user to the link. If redirect is not set, the user will be not redirected.

- `reset` allow you to reset the form after it was submitted. Useful for form like password changes.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[LIC](https://www.isc.org/licenses/)
