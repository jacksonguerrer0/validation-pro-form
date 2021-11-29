// Validación de formulari con evento blur, keyup y submit :v
const validationFormResgister = () => {
  const d = document,
    inputs = d.querySelectorAll('#form-register input'),
    expresiones = {
      user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
      name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
      password: /^.{4,12}$/, // 4 a 12 digitos.
      email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      phone: /^\d{7,14}$/ // 7 a 14 numeros.
    },
    form = d.getElementById('form-register'),
    fields = {
      user: false,
      name: false,
      password: false,
      password2: false,
      email: false,
      phone: false,
      term: false,
    };
  const handleValidation = (e) => {
    switch (e.target.name) {
      case 'user':
        validator(expresiones[e.target.name], e)
        break;
      case 'name':
        validator(expresiones[e.target.name], e)
        break;
      case 'email':
        validator(expresiones[e.target.name], e)
        break;
      case 'password':
        validator(expresiones[e.target.name], e)
        validatorPassword()
        break;
      case 'password2':
        validatorPassword()        
        break;
      case 'phone':
        validator(expresiones[e.target.name], e)
        break;
      default:
        break;
    }
  }
  inputs.forEach(input => {
    input.addEventListener('keyup', handleValidation)
    input.addEventListener('blur', handleValidation)
  })
  inputs[6].addEventListener('click', (e) => validatorCheckbox(e.target))

  const validatorCheckbox = (input) => {
    if(!input.checked){
      d.querySelector(`#form-group-${input.name} label`).classList.add('term-requiered')
      fields[input.name] = false
    }else{
      d.querySelector(`#form-group-${input.name} label`).classList.remove('term-requiered')
      fields[input.name] = true

    }
  }
  const validator = (exp, input) => {
    const groupInput = `form-group-${input.target.name}`
    if(exp.test(input.target.value)){
      d.getElementById(groupInput).classList.add('form-group-correct')
      d.querySelector(`#${groupInput} i`).classList.add('fa-check-circle')
      d.getElementById(groupInput).classList.remove('form-group-incorrect')
      d.querySelector(`#${groupInput} i`).classList.remove('fa-times-circle')
      d.querySelector(`#${groupInput} p`).classList.remove('d-block')
      fields[input.target.name] = true
    }else{
      d.getElementById(groupInput).classList.add('form-group-incorrect')
      d.querySelector(`#${groupInput} .fas`).classList.add('fa-times-circle')
      d.getElementById(groupInput).classList.remove('form-group-correct')
      d.querySelector(`#${groupInput} .fas`).classList.remove('fa-check-circle')
      d.querySelector(`#${groupInput} p`).classList.add('d-block')
      fields[input.target.name] = false
    }
  }
  const validatorPassword = () => {
    const password = d.getElementById('password'),
      password2 = d.getElementById('password2');

    if(password.value === password2.value && password.value.length > 0){
      d.getElementById('form-group-password2').classList.add('form-group-correct')
      d.querySelector(`#form-group-password2 i`).classList.add('fa-check-circle')
      d.getElementById('form-group-password2').classList.remove('form-group-incorrect')
      d.querySelector(`#form-group-password2 i`).classList.remove('fa-times-circle')
      d.querySelector(`#form-group-password2  p`).classList.remove('d-block')
      fields.password2 = true
    }else{
      d.getElementById('form-group-password2').classList.add('form-group-incorrect')
      d.querySelector(`#form-group-password2 .fas`).classList.add('fa-times-circle')
      d.getElementById('form-group-password2').classList.remove('form-group-correct')
      d.querySelector(`#form-group-password2 .fas`).classList.remove('fa-check-circle')
      d.querySelector(`#form-group-password2  p`).classList.add('d-block')
      fields.password2 = false
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    if(fields.user && fields.name && fields.password && fields.password2 && fields.email && fields.phone && fields.term){
      d.getElementById('form-sucess').classList.add('d-block')
      inputs.forEach(input => {
        const ref = d.querySelector(`#form-group-${input.name} i`)
        ref && ref.classList.remove('fa-check-circle')
      })
      setTimeout(() => {
        d.getElementById('form-sucess').classList.remove('d-block')
      }, 2000)
      form.reset()
    }else{
      inputs.forEach(input => {
        const groupInput = `form-group-${input.name}`
        if(input.value.length === 0){
          d.getElementById(groupInput).classList.add('form-group-incorrect')
          d.querySelector(`#${groupInput} .fas`).classList.add('fa-times-circle')
          d.getElementById(groupInput).classList.remove('form-group-correct')
          d.querySelector(`#${groupInput} .fas`).classList.remove('fa-check-circle')
          d.querySelector(`#form-msg`).classList.add('d-block')
          setTimeout(() => {
            d.querySelector(`#form-msg`).classList.remove('d-block')
          }, 2000)
        }
      })
      validatorCheckbox(inputs[6])
    }
  })
}

validationFormResgister()