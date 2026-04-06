export function successResponse(data: any, message = "Success") {
    return { success: true, message, data };
}

export function errorResponse(message = "Something went wrong") {
    return { success: false, message, data: null };
}
