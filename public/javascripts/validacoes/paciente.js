$("#cpf").mask("999.999.999-99");
$("#dataNascimento").mask("99/99/9999");
$("#telefone").mask("(99)999999999");

function validarCampos() {
    // Validando nome do paciente
    if ($("#nome").val() == "") {
        bootbox.alert({
            message: "Por favor, informe o seu nome.",
            size: 'small',
            callback: function () {
                $(function() { $("#nome").focus(); });
            }
        });
        return false;
    }

    // Validando CPF
    if ($("#cpf").val() == "") {
        bootbox.alert({
            message: "Por favor, informe o seu CPF.", 
            size: 'small',
            callback: function () {
                $(function() { $("#cpf").focus(); });
            }
        });
        return false;
    } else if (!isValidCPF($("#cpf").val())) {
        bootbox.alert({
            message: "CPF informado é inválido.", 
            size: 'small',
            callback: function () {
                $(function() { $("#cpf").focus(); });
            }
        });
        return false;
    }

    // Validando data nascimento
    if ($("#dataNascimento").val() == "") {
        bootbox.alert({
            message: "Por favor, informe sua data de nascimento.", 
            size: 'small',
            callback: function () {
                $(function() { $("#dataNascimento").focus(); });
            }
        });
        return false;
    } else if (!isValidData($("#dataNascimento").val())) {
        bootbox.alert({
            message: "Data de nascimento informada é inválida.", 
            size: 'small',
            callback: function () {
                $(function() { $("#dataNascimento").focus(); });
            }
        });
        return false;
    }

    // Validando email
    if ($("#email").val() == "") {
        bootbox.alert({
            message: "Por favor, informe seu E-mail.", 
            size: 'small',
            callback: function () {
                $(function() { $("#email").focus(); });
            }
        });
        return false;
    } else if (!isValidEmail($("#email").val())) {
        bootbox.alert({
            message: "E-mail informado é inválido.", 
            size: 'small',
            callback: function () {
                $(function() { $("#email").focus(); });
            }
        });
        return false;
    }

    // Validando telefone
    if ($("#telefone").val() == "") {
        bootbox.alert({
            message: "Por favor, informe seu telefone.", 
            size: 'small',
            callback: function () {
                $(function() { $("#telefone").focus(); });
            }
        });
        return false;
    } else if (!isValidTelefone($("#telefone").val())) {
        bootbox.alert({
            message: "Telefone informado é inválido.", 
            size: 'small',
            callback: function () {
                $(function() { $("#telefone").focus(); });
            }
        });
        return false;
    }
    return true;
}

$("#formPaciente").submit(function( event ) {
    if (validarCampos()) 
        $("#salvar").submit();
    else 
        event.preventDefault();
});

// Para tratar a msg enviada do banco (layout - msg)
if( $("#msg").val() != '' ) {
    bootbox.alert($("#msg").val(), function(){
        $(function() { $("#cpf").focus(); });
    });
}