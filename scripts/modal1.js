$("#form").on("submit", function(event) {
    event.preventDefault();
    openModal();

    const form = $(event.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");
    
    [name, phone, comment, to].forEach((field) => {
        field.removeClass("input-error");
        if (field.val().trim() == "") {
            field.addClass("input-error"); 
        }
    });

const errorFields = form.find(".input-error");

if (errorFields.lenght == 0) {
    $.ajax({
        url: "https://webdev-api.loftschool.com/sendmail",
        method: "post",
        data: {
            name: name.val(),
            phone: phone.val(),
            comment: comment.val(),
            to: to.val(),
        },
    });
}
});



function openModal(content) {
    // $(".modal").addClass("modal--active");
    // $("body").addClass("blocked");
    // $.fancybox.open({
    //     src:".modal",
    //     type:"inline"
    // })
}

$(".js-modal--close").click(function(event){
    event.preventDefault();
    $(".modal").removeClass("modal--active");
    $("body").removeClass("blocked");
    // $.fancybox.close();
})