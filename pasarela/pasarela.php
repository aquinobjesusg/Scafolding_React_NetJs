<?php

//ddrsistemas
//ginecoreport
//labopath
//printerya

if( !isset($_GET["sistema"])) {
    $sistema = "atlantida";
} else {
    $sistema = $_GET["sistema"];
}
?>
<!DOCTYPE html>

<html>
<head>
    <title>Pasarela de Cobro</title>
    <link href="Style/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="Style/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="brand-logo ">

    <div class="container">

    <div class="row justify-content-md-center">
				<div class="col-md-4">
				</div>
				<div class="col-md-4">
                    <img class="img-fluid" src="logos/<?php echo $sistema; ?>.png" height="150px" width="150px" alt="App Logo" />
				</div>
                <div class="col-md-4">
				</div>
			</div>
            </div>


    <div class="row justify-content-md-center">
            <div class="col-12 col-md-9">

                <!--Datos del Pago-->
                <div class="card mb-3">
                    <h5 class="card-header">Datos del Pago</h5>
                    <div class="card-body">
                        <form id="form" method="post" autocomplete="off" class="needs-validation" novalidate>
                            <div class="row">

                                <!--Es persona jurídica-->
                                <div class="col-4 mb-3">
                                    <div class="form-check form-switch p-0">
                                        <label class="form-check-label" for="chkJuridicalPerson">Es Persona Jurídica</label>
                                        <br />
                                        <input class="form-check-input m-0 mt-2" type="checkbox" id="chkJuridicalPerson" readonly>

                                    </div>
                                </div>

                                <!--Cédula-->
                                <div class="col-4 mb-3">
                                    <label class="form-label" for="identificationNumber">Cédula *</label>
                                    <div class="row">
                                        <div class="col-4">
                                            <select id="identificationNac" name="identificationNac" class="form-select">
                                                <option value="V">
                                                    V
                                                </option>
                                                <option value="E">
                                                    E
                                                </option>
                                                <option value="P">
                                                    P
                                                </option>
                                            </select>
                                        </div>
                                        <div class="col-8 ps-0 validate-me">
                                            <input id="identificationNumber" name="identificationNumber"
                                                   class="form-control" value="11994584" maxlength="20" required readonly>
                                        </div>
                                    </div>
                                </div>

                                <!--Rif-->
                                <div class="col-4 mb-3">
                                    <label for="rifLetter" class="form-label" disabled>RIF *</label>
                                    <div class="row">
                                        <div class="col-4">
                                            <select id="rifLetter" name="rifLetter" class="form-select" required>
                                                <option value="J">
                                                    J
                                                </option>
                                                <option value="G">
                                                    G
                                                </option>
                                            </select>
                                        </div>
                                        <div class="col-8 ps-0 validate-me">
                                            <input id="rifNumber" name="rifNumber" class="form-control" maxlength="20" required readonly>
                                        </div>
                                    </div>
                                </div>

                                <!--Monto-->
                                <div class="col-4 mb-3 validate-me">
                                    <label for="amount" class="form-label">Monto *</label>
                                    <input id="amount" name="amount" class="form-control" value="140000" maxlength="10" required readonly>
                                </div>

                                <!--Moneda-->
                                <div class="col-4 mb-3">
                                    <label for="currency" class="form-label">Moneda *</label>
                                    <div class="row">
                                        <div class="col">
                                            <select id="currency" name="currency" class="form-select" style="width:100%">
                                                <option value="1">
                                                    Bolivares
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!--Referencia-->
                                <div class="col-4 mb-3 validate-me">
                                    <label for="reference" class="form-label">Nro de Cuenta *</label>
                                    <input id="reference" name="reference" class="form-control" value="0102036589747896" maxlength="50" required readonly>
                                </div>

                                <!--Teléfono-->
                                <div class="col-4 mb-3 validate-me">
                                    <label for="cellphone" class="form-label">Teléfono *</label>
                                    <input id="cellphone" name="cellphone" class="form-control" maxlength="30" value="04143995926" required readonly>
                                </div>

                                <!--Mail-->
                                <div class="col-8 mb-3">
                                    <label for="email" class="form-label">Correo Electrónico</label>
                                    <input id="email" name="email" type="email" class="form-control" value="cafloresve@gmail.com" maxlength="50" readonly>
                                </div>

                                <!--Título-->
                                <div class="col-4 mb-3 validate-me">
                                    <label for="title" class="form-label">Título *</label>
                                    <input id="title" name="title" class="form-control" maxlength="50" value="657 - COMBO VIDA"  required readonly>
                                </div>

                                <!--Descripción-->
                                <div class="col-8 mb-3 validate-me">
                                    <label for="description" class="form-label">Descripción *</label>
                                    <textarea id="description" name="description" class="form-control" maxlength="500" rows="3" required readonly>657 - COMBO VIDA  $4000 SEGUROS VZLA  MENSUAL </textarea>
                                </div>

                            </div>
                            
                                <img src="images/botondepago.png" alt="App Logo" height="50px" width="100px" />
                            
                            <div class="row mb-2 mt-3">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <input id="btnCreatePayment" type="submit" value="Iniciar Proceso de Pago" class="btn btn-success">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!--Mensaje de error-->
                <div class="row mb-3" id="paymentErrorContainer">
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <p id="paymentError"></p>
                        <button id="btnCloseAlert" type="button" class="btn-close" aria-label="Close"></button>
                    </div>
                </div>

                <!--Link de pago-->
                <div class="card mb-3" id="paymentLinkContainer">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-6">
                                <h5>Link de Pago</h5>
                            </div>
                            <div class="col-6">
                                <div class="d-flex justify-content-end">
                                    <button id="btnCopyLink" class="btn" type="button"
                                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Copiar">
                                        <img src="images/clipboard.svg" width="20" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="input-group">
                                    <input type="text" id="paymentLink" class="form-control" readonly>
                                    <button id="btnGoPayment" class="btn btn-secondary" type="button" title="Limpiar">Ir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--Consulta de Pago
                <div class="card mb-3">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-6">
                                <h5>Consultar Pago</h5>
                            </div>
                            <div class="col-6">
                                <div class="d-flex justify-content-end">
                                    <button id="btnClearSearchPayment" class="btn" type="button"
                                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Limpiar">
                                        <img src="images/eraser.svg" width="20" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="input-group">
                                    <input type="text" id="txtToken" class="form-control" placeholder="Ingrese el token de pago">
                                    <button class="btn btn-secondary" type="button" id="searchPayment">Consultar</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <table id="checkPaymentTable" class="table table-striped">
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            -->
                <!--Nuevo pago
                <div class="row mb-3">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <input id="btnNewPayment" type="submit" value="Nuevo Pago" class="btn btn-primary">
                    </div>
                </div>-->

                <div id="spinner">
                    <div class="spinner-border text-primary" role="status">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="Scripts/jquery-3.6.4.min.js"></script>
    <script type="text/javascript" src="Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="Scripts/bootstrap.bundle.min.js"></script>
    <script type="text/javascript">

        $(function () {

            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl, { container: 'body', trigger: 'hover' })
            })

            enableJuridicalPerson($('#chkJuridicalPerson').prop("checked"));

            $('#chkJuridicalPerson').on('change', function () {
                enableJuridicalPerson($('#chkJuridicalPerson').prop("checked"));
            });

            $('#paymentErrorContainer').hide();
            $('#paymentLinkContainer').hide();
            $('#btnNewPayment').hide();

            $('#btnCloseAlert').click(function (e) {
                e.preventDefault();
                $("#paymentErrorContainer").hide();
            });

            $('#btnGoPayment').click(function (e) {
                e.preventDefault();
                var url = $('#paymentLink').val();
                window.open(url, '_blank');
            });

            $('#btnCopyLink').click(function (e) {
                e.preventDefault();
                copyToClipboard($('#paymentLink')[0]);
            });

            $('#btnNewPayment').click(function (e) {
                e.preventDefault();
                $("#form").trigger("reset");
                $('#paymentErrorContainer').hide();
                $('#paymentLinkContainer').hide();
                $('#btnNewPayment').hide();
                $('#btnCreatePayment').show();
                $('#checkPaymentTable tbody').html('');
                $('#txtToken').val('');

                enabledControls(false);
                enableJuridicalPerson($('#chkJuridicalPerson').prop("checked"));
                removeValidationClass(form);
            });

            $('#btnClearSearchPayment').click(function (e) {
                e.preventDefault();
                $('#checkPaymentTable tbody').html('');
                $('#txtToken').val('');
            });

            const forms = document.querySelectorAll('.needs-validation');
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    event.preventDefault();
                    if (form.checkValidity()) {
                        createPayment();
                    }
                    else {
                        event.stopPropagation();
                        addValidationClass(form);
                    }
                }, false)
            });

            $('#searchPayment').click(function () {
                var tokenValue = $("#txtToken").val();

                if (tokenValue != '') {
                    $.ajax({
                        url: 'CheckPayment-ajax.php',
                        type: "POST",
                        data: { token: tokenValue },
                        beforeSend: function () {
                            $("#spinner").addClass("show");
                        },
                        complete: function () {
                            $("#spinner").removeClass("show");
                        },
                        success: function (data) {

                            jsonResponse = JSON.parse(data);
                            var table = $('#checkPaymentTable tbody');
                            table.html('');

                            for (var prop in jsonResponse) {
                                var tr = $('<tr>');
                                var td1 = $('<td>');
                                var td2 = $('<td>');
                                td1.html(prop);
                                if (jsonResponse[prop] != null)
                                    td2.html(jsonResponse[prop].toString());
                                tr.append(td1);
                                tr.append(td2);
                                table.append(tr);
                            }

                        }
                    });
                }
            });
        });

        function enableJuridicalPerson(isJuridicalPerson) {
            if (isJuridicalPerson == true) {
                $('#rifLetter').removeAttr('disabled');
                $('#rifNumber').removeAttr('disabled');

            } else {
                $('#rifLetter').attr('disabled', 'disabled');
                $('#rifNumber').attr('disabled', 'disabled');
            }
        }

        function copyToClipboard(elem) {
            // create hidden text element, if it doesn't already exist
            var targetId = "_hiddenCopyText_";
            var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
            var origSelectionStart, origSelectionEnd;
            if (isInput) {
                // can just use the original source element for the selection and copy
                target = elem;
                origSelectionStart = elem.selectionStart;
                origSelectionEnd = elem.selectionEnd;
            } else {
                // must use a temporary form element for the selection and copy
                target = document.getElementById(targetId);
                if (!target) {
                    var target = document.createElement("textarea");
                    target.style.position = "absolute";
                    target.style.left = "-9999px";
                    target.style.top = "0";
                    target.id = targetId;
                    document.body.appendChild(target);
                }
                target.textContent = elem.textContent;
            }
            // select the content
            var currentFocus = document.activeElement;
            target.focus();
            target.setSelectionRange(0, target.value.length);

            // copy the selection
            var succeed;
            try {
                succeed = document.execCommand("copy");
            } catch (e) {
                succeed = false;
            }
            // restore original focus
            if (currentFocus && typeof currentFocus.focus === "function") {
                currentFocus.focus();
            }

            if (isInput) {
                // restore prior selection
                elem.setSelectionRange(origSelectionStart, origSelectionEnd);
            } else {
                // clear temporary content
                target.textContent = "";
            }
            return succeed;
        }

        function createPayment() {
            $('#paymentErrorContainer').hide();
            $('#paymentLinkContainer').hide();

            $.ajax({
                url: 'ProcessPaymentDemo.php',
                type: "POST",
                data: $("#form").serialize(),
                beforeSend: function () {
                    $("#spinner").addClass("show");
                },
                complete: function () {
                    $("#spinner").removeClass("show");
                },
                success: function (data) {
                    if (data.success) {
                        enabledControls(true);
                        $('#paymentLink').val(data.urlPayment);
                        $('#paymentLinkContainer').css('display', 'block');

                        location.href = data.urlPayment;

                        $('#btnCreatePayment').hide();
                        $('#btnNewPayment').show();
                    }
                    else {
                        $('#paymentError').html('Código: ' + data.responseCode + '<br/>Mensaje: ' + data.responseMessage);
                        $('#paymentErrorContainer').show();
                    }
                }
            });
        }

        function addValidationClass(form) {
            var elements = form.getElementsByClassName('validate-me');
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.add('was-validated');
            }
        }

        function removeValidationClass(form) {
            var elements = form.getElementsByClassName('validate-me');
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove('was-validated');
            }
        }

        function enabledControls(enabled) {
            if (enabled) {
                $('#form input').each(function () { $(this).attr('disabled', 'disabled'); });
                $('#form select').each(function () { $(this).attr('disabled', 'disabled'); });
                $('#form textarea').each(function () { $(this).attr('disabled', 'disabled'); });
            } else {    
                $('#form input').each(function () { $(this).removeAttr('disabled'); });
                $('#form select').each(function () { $(this).removeAttr('disabled'); });
                $('#form textarea').each(function () { $(this).removeAttr('disabled'); });
            }
        }

    </script>
</body>
</html>