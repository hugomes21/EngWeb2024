//Data
exports.myDateTime = () =>
{
    var d = new Date().toISOString().substring(0,16)
    return d
}

//Name
exports.myName = () =>
{
    return "RodasDaBaby"
}

//Turma
exports.turma = "EngWeb2024 | Turma 3"