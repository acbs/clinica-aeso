function habilitarEspec (cardEsp) {
    $(".card-esp").removeClass("text-white").removeClass("bg-success").addClass('bg-light');
    $(cardEsp).removeClass("bg-light").addClass("text-white").addClass('bg-success');
}

function habilitarMedico (cardMed) {
    $(".card-med").removeClass("text-white").removeClass("bg-success").addClass('bg-light');
    $(cardMed).removeClass("bg-light").addClass("text-white").addClass('bg-success');
}

function createCardEspec(medico) {
    $(".colMd12").remove();
    $('#cardMed').append(
        '<div class="col-md-3 colMd3">' +
        '<div class="card bg-light mb-3 card-center card-med" id="'+medico.nome+'">' +
        '<div class="card-header text-center">'+medico.nome+'</div></div></div>'
    );
}

function removeCardEspec() {
    $(".colMd3").remove();
    $(".colMd12").remove();
    $('#cardMed').append(
        '<div class="col-md-12 colMd12">' +
        '<p class="text-danger text-center">Desculpa, não temos especialista Disponível</p>'
    );
}

function preencherDados () {
    
    var data = $('#data').val(),
        nome = $('#nome').val(),
        cpf = $('#cpf').val(),
        dataNascimento = $('#dataNascimento').val(),
        email = $('#email').val(),
        telefone = $('#telefone').val(),
        especialidade = $('#especialidade').val(),
        medico = $('#medico').val();
    
    $('#idDate').remove();
    $('#idNome').remove();
    $('#idCpf').remove();
    $('#idDataNascimento').remove();
    $('#idEmail').remove();
    $('#idTelefone').remove();
    $('#idEspecialidade').remove();
    $('#idMedico').remove();

    $('#confData').append( $('<h1/>').text(data).addClass('text-success font-weight-bold').attr('id', 'idDate'));
    $('#confNome').append( $('<td/>').text(nome).addClass('text-success font-weight-bold').attr('id', 'idNome'));
    $('#confCpf').append( $('<td/>').text(cpf).addClass('text-success font-weight-bold').attr('id', 'idCpf'));
    $('#confDataNascimento').append( $('<td/>').text(dataNascimento).addClass('text-success font-weight-bold').attr('id', 'idDataNascimento'));
    $('#confEmail').append( $('<td/>').text(email).addClass('text-success font-weight-bold').attr('id', 'idEmail'));
    $('#confTelefone').append( $('<td/>').text(telefone).addClass('text-success font-weight-bold').attr('id', 'idTelefone'));
    $('#confEspecialidade').append( $('<td/>').text(especialidade).addClass('text-success font-weight-bold').attr('id', 'idEspecialidade'));
    $('#confMedico').append( $('<td/>').text(medico).addClass('text-success font-weight-bold').attr('id', 'idMedico'));
}

$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content');
        
    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-success').addClass('btn-default');
            $item.addClass('btn-success');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    $(".nextBtn").click(function() {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            isValid = false,
            id = $(this).attr("id");

        if (id == 'nextPaciente') {
            // Validações do paciente
            if (validarCampos()) 
                isValid = true;
        } else if (id == 'nextEspecialidade') {
            // Validação da especialidade
            if($('#especialidade').val() != '') {
                isValid = true;
                var url = '/medico/' + $('#especialidade').val();
                $.get(url, function(data){
                    if(data.length > 0) {
                        $(".colMd3").remove();
                        $.each(data, function(i, medico) {
                            createCardEspec(medico);
                        });
                    } else {
                        removeCardEspec();
                    }
                    $(".card-med").click(function(event) {
                        habilitarMedico(this);
                        $('#medico').val($(this).attr("id"));
                    });
                });
            }
        } else if (id == 'nextMedico') {
            // Validação do médico
            if($('#medico').val() != '') 
                isValid = true;
        } else  if (id == 'nextDtHora') {
            // Validação data do agendamento
            if($('#data').val() != '') 
                isValid = true;
            preencherDados();
        }
        
        if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $(".previousBtn").click(function() {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
        nextStepWizard.removeAttr('disabled').trigger('click')
    });

    $(".card-esp").click(function(event) {
        habilitarEspec(this);
        $('#especialidade').val($(this).attr("id"));
    });

    $('div.setup-panel div a.btn-success').trigger('click');
    
    $('#datepickerAgendamento').datepicker({
        inline: true,
        sideBySide: true,
        format: 'dd/mm/yyyy',
        language: 'pt-BR',
        startDate: '+0',
        daysOfWeekDisabled: '0,6'
    });

    $('#datepickerAgendamento').on('changeDate', function() {
        $('#data').val(
            $('#datepickerAgendamento').datepicker('getFormattedDate')
        );
    });
});

function chamarStep(step) {
    var nextStepWizard = $('div.setup-panel div a[href="#' + step + '"]').parent().children("a");
    nextStepWizard.removeAttr('disabled').trigger('click');
}

function validarEspecialidade() { 
    if ($("#especialidade").val() == "") {
        bootbox.alert({
            message: "Por favor, informe a especialidade.",
            size: 'small',
            callback: function () {
                $(function() { $("#especialidade").focus(); });
            }
        });
        return false;
    }
    return true;
}

function validarMedico() { 
    if ($("#medico").val() == "") {
        bootbox.alert({
            message: "Por favor, informe o médico.",
            size: 'small',
            callback: function () {
                $(function() { $("#medico").focus(); });
            }
        });
        $("#nextEspecialidade").trigger("click");
        return false;
    }
    return true;
}

function validarData() { 
    if ($("#data").val() == "") {
        bootbox.alert({
            message: "Por favor, informe a data.",
            size: 'small',
            callback: function () {
                $(function() { $("#data").focus(); });
            }
        });
        return false;
    }
    return true;
}

$("#formAgd").submit(function( event ) {

    if (!validarCampos()) {
        chamarStep('step-1');
        event.preventDefault();
    } else if (!validarEspecialidade()) {
        chamarStep('step-2');
        event.preventDefault();
    } else if (!validarMedico()) {
        chamarStep('step-3');
        event.preventDefault();
    } else if (!validarData()) {
        chamarStep('step-4');
        event.preventDefault();
    } else {
        $("#salvarAgd").submit();
    }
    
});