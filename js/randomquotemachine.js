function quote() {
    $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function ( data ) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        $( '#quote-author' ).text( post.title );
        $( '#quote-text' ).html( post.content );
        $('#twt-btn').attr("href", 'https://twitter.com/intent/tweet?hashtags=quotes&related=ahmadibrahim&text='+post.content);
      },
      cache: false
    } );
};
$( window ).on( "load", quote());

jQuery( function( $ ) {
  $( '#new-quote' ).on( 'click', function ( e ) {
    e.preventDefault();
    quote();
  } );
} );
