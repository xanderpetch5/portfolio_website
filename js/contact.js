document.addEventListener('DOMContentLoaded', function() {

    const copyButtons = document.querySelectorAll('.copy-btn');
  
    copyButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const copyText = button.getAttribute('data-copy-text');
        navigator.clipboard.writeText(copyText).then(() => {

      });
    });
  });
});
  
