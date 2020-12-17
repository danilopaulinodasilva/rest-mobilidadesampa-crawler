const Yup = require('yup');
const User = require('../models/UserModel');

class UserController {

  async index(req, res) {

    /* index: retorna todos registros */

    // await para aguardar o retorno da resposta do model 

    await User.index()

      .then((data) => {

        return res.status(200)
          .json(data);

      })

      .catch((err) => {

        // identifica erro do servidor, geralmente se alguma variavel não foi declarada por ex

        if (err instanceof ReferenceError) {

          console.log(err);
          return res.status(500)
            .json(err);

        } else {

          // se não for do servidor, é o request na rota
          return res.status(400)
            .json(err);

        }

      });

  }

  async show(req, res) {

    /* show: passando o id na url retorna apenas o registro procurado */

    // await para aguardar o retorno da resposta do model 

    await User.show(req.params.guid)

      .then((data) => {

        return res.status(200)
          .json(data);

      })

      .catch((err) => {

        // identifica erro do servidor, geralmente se alguma variavel não foi declarada por ex

        if (err instanceof ReferenceError) {

          console.log(err);
          return res.status(500)
            .json(err);

        } else {

          // se não for do servidor, é o request na rota

          return res.status(400)
            .json(err);

        }

      });

  }

  async store(req, res) {

    const body = JSON.stringify(req.body);
    const novoBody = JSON.parse(body);

    /* store: cria um novo registro no banco, necessario passar via body */

    // schema de validação do Yup

    const invitationSchema = Yup.object().shape({
      nome: Yup.string().required().matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{3,}[ ][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{2,}/, "Informe nome e sobrenome"),
      email: Yup.string().email("Informe um e-mail válido").required(),
      telefoneFixoCelular: Yup.string().required().matches(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/, "Telefone e/ou celular inválido"),
      dataDeNascimento: Yup.string().required().matches(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/gi, "Data de nascimento inválida"),
      sexo: Yup.string().oneOf(['masculino', 'feminino'], "Opção inválida, favor informar: masculino ou feminino, case insenstive").required(),
      jaTrabalhou: Yup.string().oneOf(['true', 'false'], "Opção inválida, favor informar: true ou false, case insenstive").required(),
      url: Yup.string().matches(/^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/, "Informe uma URL válida").required(),
    });

    // try & catch para tentar validar de acordo com o req.body recebido e comparado ao schema definido acima

    try {

      // validateSync no schema inromado acima, passando o req.body e abortEarly para evitar de quebrar ao receber o primeiro erro

      invitationSchema.validateSync(novoBody, { abortEarly: false });

    } catch (e) {

      // se a validação do schema falhar, interrompe o fluxo e retorna os erros

      const result = e.inner; // e.inner é onde estão todas informações sobre o erro
      const errors = []; // crio um array vazio para armazenar as msg de erro

      // percorre todos erros recebidos

      result.forEach(element => {

        const path = element.path; // o campo que tem erro
        const message = element.message; // a msg do Yup 

        errors.push({ field: path, error: message }); // armazena no array de erros 

      });

      // quebra todo fluxo e da um res para retornar os erros de validacao

      return res.status(400).json({
        "status": "false",
        "yup": errors
      });

    }

    const userExists = await User.findOne(novoBody.email)

      .then((data) => {

        return data.status;

      })

      .catch((err) => {

        // identifica erro do servidor, geralmente se alguma variavel não foi declarada por ex

        if (err instanceof ReferenceError) {

          console.log(err);
          return res.status(500).json(err);

        } else {

          // se não for do servidor, é o request na rota
          return res.status(400).json(err);

        }

      });

    // caso tudo acima ocorra bem, await para aguardar o retorno da resposta do model para criar o usuário

    if (userExists) {

      return res.status(409)
        .json({ "status": false, "errors": { code: "400Y4" }, "message": "Usuário já cadastrado" });

    }

    await User.store(novoBody)

      .then((data) => {

        return res.status(200)
          .json(data);

      })

      .catch((err) => {

        // identifica erro do servidor, geralmente se alguma variavel não foi declarada por ex

        if (err instanceof ReferenceError) {

          console.log(err);
          return res.status(500).json(err);

        } else {

          // se não for do servidor, é o request na rota
          return res.status(400).json(err);

        }

      });

  }

  async update(req, res) {

    /* update: atualiza o registro, necessário passar todos os campos e dados via body e o id do registro via url */

    // schema de validação do Yup

    const invitationSchema = Yup.object().shape({
      nome: Yup.string().required().matches(/^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/, "Informe nome e sobrenome"),
      email: Yup.string().email("Informe um e-mail válido").required(),
      telefoneFixoCelular: Yup.string().required().matches(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/, "Telefone e/ou celular inválido"),
      dataDeNascimento: Yup.string().required().matches(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/gi, "Data de nascimento inválida"),
      sexo: Yup.string().oneOf(['masculino', 'feminino'], "Opção inválida, favor informar: masculino ou feminino, case senstive").required(),
      url: Yup.string().matches(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Informe uma URL válida").required(),
      aff_id: Yup.number().min(1).max(9999).required("Por favor, informe um aff_id de 1 a 4 dígitos"),
      // celular: Yup.string().required().matches(/^\(?\d{2}\)?[\s-]?[\s9]{1}?\d{4}-?\d{4}$/,"Informe um número com 9 dígitos mais DDD; ex: 11966554433 ou (11) 96655-4433"),
      // telefone: Yup.string().required().matches(/^\(?\d{2}\)?[\s-]?\d{4}-?\d{4}$/,"Informe um número com 8 dígitos mais DDD; ex: 1133554433 ou (11) 3355-4433"),
    });

    // try & catch para tentar validar de acordo com o req.body recebido e comparado ao schema definido acima

    try {

      // validateSync no schema inromado acima, passando o req.body e abortEarly para evitar de quebrar ao receber o primeiro erro

      invitationSchema.validateSync(req.body, { abortEarly: false });

    } catch (e) {

      // se a validação do schema falhar, interrompe o fluxo e retorna os erros

      const result = e.inner; // e.inner é onde estão todas informações sobre o erro
      const errors = []; // crio um array vazio para armazenar as msg de erro

      // percorre todos erros recebidos

      result.forEach(element => {

        const path = element.path; // o campo que tem erro
        const message = element.message; // a msg do Yup 

        errors.push({ field: path, error: message }); // armazena no array de erros 

      });

      // quebra todo fluxo e da um res para retornar os erros de validacao

      return res.status(400).json({
        "status": "false",
        "yup": errors
      });

    }

    const userExists = await User.findOne(req.body.email)

      .then((data) => {

        return data.status;

      })

      .catch((err) => {

        // identifica erro do servidor, geralmente se alguma variavel não foi declarada por ex

        if (err instanceof ReferenceError) {

          console.log(err);
          return res.status(500).json(err);

        } else {

          // se não for do servidor, é o request na rota
          return res.status(400).json(err);

        }

      });

    // caso tudo acima ocorra bem, await para aguardar o retorno da resposta do model para criar o usuário

    if (userExists) {

      return res.status(409)
        .json({ "status": false, "message": "Usuário já cadastrado" });

    }

    await User.update(req.body, req.params.guid)

      .then((data) => {

        return res.status(200)
          .json(data);

      })

      .catch((err) => {

        // identifica erro do servidor, geralmente se alguma variavel não foi declarada por ex

        if (err instanceof ReferenceError) {

          console.log(err);
          return res.status(500).json(err);

        } else {

          // se não for do servidor, é o request na rota
          return res.status(400).json(err);

        }

      });

  }

  async destroy(req, res) {

    /* destroy: apaga o registro, necessário passar o id do registro via url */

    // await para aguardar o retorno da resposta do model 

    await User.destroy(req.params.guid)

      .then((data) => {

        return res.status(200)
          .json(data);

      })


      .catch((err) => {

        // identifica erro do servidor, geralmente se alguma variavel não foi declarada por ex

        if (err instanceof ReferenceError) {

          console.log(err);
          return res.status(500).json(err);

        } else {

          // se não for do servidor, é o request na rota
          return res.status(400).json(err);

        }

      });

  }

}

module.exports = new UserController();
