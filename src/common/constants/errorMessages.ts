interface IErrorMessages {
    [name: number]: string;
}

export default {
    400: 'Try again with another set of input!',
    401: 'Oh no, you do not have access to this.',
    403: 'Oh no, you do not have access to this.',
    500: 'Something bad happened. Please try again!',
} as IErrorMessages;
