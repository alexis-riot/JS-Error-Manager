"use strict";

function errorField(field, message) {
    field.addClass('is-invalid');
    field.after('<div class="invalid-feedback">' + message + '</div>')
}

window.unprogressButton = function(element = $('span.spinner-border').parent("button")) {
    element.find('span.spinner-border').remove();
    element.removeAttr('disabled');
};

window.progressButton = function(element) {
    element.prepend('<span class="spinner-border spinner-border-sm mr-1"></span> ');
    element.attr('disabled', 'disabled');
};

window.successResponse = function(response) {
    if (response.data.swal) {
        Swal.fire({
            title: "",
            text: response.data.message,
            icon: response.data.status,
        })
        .then(function() {
            if (response.data.redirect) {
                window.location.href = response.data.redirect;
            } else {
                if (response.data.reset)
                    $('button[disabled]').closest('form')[0].reset();
                unprogressButton();
            }
        });
    } else {
        switch (response.data.status) {
            case "success":
                toastr.success(response.data.message, "", {timeOut: (response.data.redirect ? 2000 : 3000)});
                break;
            case "warning":
                toastr.warning(response.data.message, "", {timeOut: (response.data.redirect ? 2000 : 3000)});
                break;
            case "danger":
                toastr.error(response.data.message, "", {timeOut: (response.data.redirect ? 2000 : 3000)});
                break;
            default:
                toastr.info(response.data.message, "", {timeOut: (response.data.redirect ? 2000 : 3000)});
                break;
        }
        if (response.data.redirect) {
            setTimeout(function () {
                window.location.href = response.data.redirect;
            }, 2000);
        } else {
            if (response.data.reset)
                $('button[disabled]').closest('form')[0].reset();
            unprogressButton();
        }
    }

};

window.errorResponse = function(response) {
    response = response.response;

    if (response.status !== 422) {
        toastr.error("An error occured on server.");
    } else {
        $('.is-invalid')
            .removeClass('is-invalid')
            .next('span.invalid-feedback').remove();

        toastr.error(response.data.message);
        for (var index in response.data.errors) {
            errorField($('#' + index), response.data.errors[index][0]);
        }
    }
    unprogressButton();
};
