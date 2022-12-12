export default function customerSchema(req,res,next){
    const { name, phone, cpf, birthday } = req.body;
    if (
      isNaN(cpf) ||
      isNaN(phone) ||
      cpf.toString().length !== 11 ||
      birthday.toString().length > 11 ||
      birthday.toString().length < 10 ||
      !name ||
      name.length < 1 ||
      (birthday instanceof Date && !isNaN(data))
    ) {
      return res.sendStatus(400);
    }
    next();
}