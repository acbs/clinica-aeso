$("#cpf").mask("999.999.999-99");
$("#dataNascimento").mask("99/99/9999");
$("#telefone").mask("(99)999999999");

function validarCampos() {
    // Validando nome do paciente
    if ($("#nome").val() == "") {
        bootbox.alert({message: "Por favor, informe o seu nome.", size: 'small'});
        return false;
    }

    // Validando CPF
    if ($("#cpf").val() == "") {
        bootbox.alert({message: "Por favor, informe o seu CPF.", size: 'small'});
        return false;
    } else if (!isValidCPF($("#cpf").val())) {
        bootbox.alert({message: "CPF informado é inválido.", size: 'small'});
        return false;
    }

    // Validando data nascimento
    if ($("#dataNascimento").val() == "") {
        bootbox.alert({message: "Por favor, informe sua data de nascimento.", size: 'small'});
        return false;
    } else if (!isValidData($("#dataNascimento").val())) {
        bootbox.alert({message: "Data de nascimento informada é inválida.", size: 'small'});
        return false;
    }

    // Validando email
    if ($("#email").val() == "") {
        bootbox.alert({message: "Por favor, informe seu E-mail.", size: 'small'});
        return false;
    } else if (!isValidEmail($("#email").val())) {
        bootbox.alert({message: "E-mail informado é inválido.", size: 'small'});
        return false;
    }

    // Validando telefone
    if ($("#telefone").val() == "") {
        bootbox.alert({message: "Por favor, informe seu telefone.", size: 'small'});
        return false;
    } else if (!isValidTelefone($("#telefone").val())) {
        bootbox.alert({message: "Telefone informado é inválido.", size: 'small'});
        return false;
    }
    return true;
}

$( "#createPaciente" ).submit(function( event ) {
    if (validarCampos()) 
        $( "#salvar" ).submit();
    else 
        event.preventDefault();
});

$("#nome").keypress(function () {
    $("#nome").removeClass("is-invalid");
    $("#inNome").removeClass("block").addClass("none");
});

$("#cpf").keypress(function () {
    $("#cpf").removeClass("is-invalid");
    $("#inCpf").removeClass("block").addClass("none");
});

$("#dataNascimento").blur(function () {
    $("#dataNascimento").removeClass("is-invalid");
    $("#inDataNascimento").removeClass("block").addClass("none");
});

$("#email").blur(function () {
    $("#email").removeClass("is-invalid");
    $("#inEmail").removeClass("block").addClass("none");
});

$("#telefone").blur(function () {
    $("#telefone").removeClass("is-invalid");
    $("#inTelefone").removeClass("block").addClass("none");
});