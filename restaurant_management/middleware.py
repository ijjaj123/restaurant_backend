class SimpleCORSMiddleware:
    """Very small CORS middleware for local development only.

    Adds permissive CORS headers and handles OPTIONS preflight.
    Do NOT use in production.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Handle preflight
        if request.method == "OPTIONS":
            from django.http import HttpResponse

            response = HttpResponse()
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
            return response

        response = self.get_response(request)
        response["Access-Control-Allow-Origin"] = "*"
        return response
