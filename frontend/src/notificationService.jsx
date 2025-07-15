import Swal from 'sweetalert2';

const AlertService = {
  success: (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message || 'Operation successful.',
    });
  },

  error: (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message || 'Something went wrong.',
    });
  },

  warning: (message) => {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: message || 'Please check the data.',
    });
  },

  confirmation: (message, callback) => {
    Swal.fire({
      title: 'Are you sure?',
      text: message || 'Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        callback(); // Call the provided callback if confirmed
      }
    });
  },
};

export default AlertService;
