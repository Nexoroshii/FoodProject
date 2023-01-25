function forms(){
 // forms

 const forms = document.querySelectorAll("form");

 const message = {
   loading: "img/form/spinner.svg",
   succes: "Thanks, we will call you",
   failure: "Something went wrong",
 };

 forms.forEach((item) => {
   bindPostData(item);
 });

 const postData = async (url, data) => {
   const res = await fetch(url, {
     method: "POST",
     headers: {
       "Content-type": "application/json",
     },
     body: data,
   });
   return await res.json();
 };

 function bindPostData(form) {
   form.addEventListener("submit", (e) => {
     e.preventDefault();

     let statusMessage = document.createElement("img");
     statusMessage.src = message.loading;
     statusMessage.style.cssText = `
       display: block;
       margin: 0 auto;
     `;
   
     form.insertAdjacentElement("afterend", statusMessage);
     const formData = new FormData(form);

     const json = JSON.stringify(Object.fromEntries(formData.entries()));

     postData("http://localhost:3000/requests", json)
       .then((data) => {
         console.log(data);
         showThanksModaL(message.succes);

         statusMessage.remove();
       })
       .catch(() => {
         showThanksModaL(message.failure);
       })
       .finally(() => {
         form.reset();
       });
   });
 }

 function showThanksModaL(message) {
   const previousModalDialog = document.querySelector(".modal__dialog");

   previousModalDialog.classList.add("hide");
   openModal();

   const thanksModal = document.createElement("div");
   thanksModal.classList.add("modal__dialog");
   thanksModal.innerHTML = `
     <div class="modal__content">
       <div class="modal__close" data-close>×</div>
       <div class="modal__title">${message}</div>
     </div>
   `;

   document.querySelector(".modal").append(thanksModal);
   setTimeout(() => {
     thanksModal.remove();
     previousModalDialog.classList.add("show");
     previousModalDialog.classList.remove("hide");
     closeModal();
   }, 4000);
 }
 fetch("http://localhost:3000/menu")
   .then((data) => data.json())
   .then((res) => console.log(res));
}

module.exports = forms;