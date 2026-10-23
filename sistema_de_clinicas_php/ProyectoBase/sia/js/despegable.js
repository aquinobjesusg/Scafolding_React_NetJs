   $(document).ready(function() {
        $('.dropdown').hover(function() {
            $(this).find('.dropdown-menu').show();
        }, function() {
            $(this).find('.dropdown-menu').hide();
        });
    });
