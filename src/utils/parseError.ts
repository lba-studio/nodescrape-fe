export default function(error: any) {
  if (error.message) {
    return error.message;
  } else {
    return 'An unexpected error occurred. Please try again later.';
  }
}