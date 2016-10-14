$(function () {

    
    //save done tasks
    $('.checkbox').on('click', function() {
        var position = $(this).index('.checkbox');
        var text = $('.task-text').eq(position).text();
        var done = $(this).prop('checked');
        $('#temp1').val(text);
        $('#temp2').val(done);
        $('#save').trigger('click');
    });
    

    //done/undone code
    var doneTasks = 0;
    var unDoneTasks = 0;
    
    for (var i = 0; i < $('.task-text').length; i++) {
        var thisCheckbox = $('.checkbox').eq(i);
        var thisTaskText = $('.task-text').eq(i);
        var done = thisCheckbox.attr('rel');
        if (done == "true") {
            thisCheckbox.prop('checked', true);
            thisTaskText.css({'color': 'red'});
            doneTasks++;
        }else if (done == "false") {
            thisCheckbox.prop('checked', false);
            unDoneTasks++;
        }
    }
    
    //show status
    $('.status-text').eq(1).text('done tasks: ' + doneTasks);
    $('.status-text').eq(2).text('undone tasks: ' + unDoneTasks);
    
    
});