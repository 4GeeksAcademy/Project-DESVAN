from api.routes import api

@api.route("/event", methods=['GET'])
def event():
    return "test pasado"

@api.route("/event", methods=['POST'])
def event():
    return

@api.route("/event", methods=['PUT'])
def event():
    return

@api.route("/event", methods=['DELETE'])
def event():
    return