//search field
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => {
            //checking if phone is found
            if (data.data.length)
            {   
                spinner('block');
                document.getElementById('error-message').style.display = 'none';
                displaySearchResult(data.data.slice(0, 20));
                // checking is it more than 20
                if(data.data.length>20)
                {
                    document.getElementById('see-more').style.display = 'block';
                    // checking seemore button when it is click clicked
                    document.getElementById('see-more').addEventListener('click', function () {
                        // display for more than 20
                        displaySearchResult(data.data);
                    })
                }
            } 
            //if nothing is found

            else
            {

                document.getElementById('error-message').style.display = 'block';
                document.getElementById('search-result').textContent = '';
                document.getElementById('see-more').style.display = 'none';

             }

        }
    )
}



// Search result display
const displaySearchResult = phones => {
     const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
     phones.forEach(phone => {
         const div = document.createElement('div');
         //adding to card
        div.innerHTML = `
          <div class="card shadow-lg h-100 p-4  rounded">
            <img src="${phone.image}" class="card-img-top img-fluid w-75 mx-auto" alt="Mobail Info">
            <div class="card-body">
                    <h5 class="card-title">Phone Name : ${phone.phone_name}</h5>
                    <h5 class="card-title">Phone Brand : ${phone.brand}</h5>
            </div>
                <div class="card-footer bg-white border-0">            
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadData('${phone.slug}')">Details Explore</button>
                </div>
         </div>
        `;
        div.classList.add('col');
         searchResult.appendChild(div);
     });
    spinner('none');
    document.getElementById('see-more').style.display = 'none';
    document.getElementById('all-phone').style.display = 'none';
    document.getElementById('label-all-phone').style.display = 'none';

}


const allphone=()=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=p`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => displayAlllPhoneResult(data.data))
}

window.onload = function () {
    allphone();
};
const displayAlllPhoneResult = phones => {
     const searchResult = document.getElementById('all-phone');
    searchResult.textContent = '';
     phones.forEach(phone => {
         const div = document.createElement('div');
         //adding to card
        div.innerHTML = `
          <div class="card shadow-lg h-100 p-4  rounded">
            <img src="${phone.image}" class="card-img-top img-fluid w-75 mx-auto" alt="Mobail Info">
            <div class="card-body">
                    <h5 class="card-title">Phone Name : ${phone.phone_name}</h5>
                    <h5 class="card-title">Phone Brand : ${phone.brand}</h5>
            </div>
                <div class="card-footer bg-white border-0">            
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadData('${phone.slug}')">Details Explore</button>
                </div>
         </div>
        `;
        div.classList.add('col');
         searchResult.appendChild(div);
     });
    spinner('none');
}

//load data using id
const loadData = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => displaySinglePhone(data.data))
    
}
//full specification on a modal
const displaySinglePhone = phone => {
    const singlePhone = document.getElementById('single-phone');
            singlePhone.textContent = '';
    const div = document.createElement('div');
    //adding full specification on modal
    div.innerHTML = `
             <div class="modal-header">
                <h3 class="modal-title" id="exampleModalLabel">${phone.name} Full Specification</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body row">
                <div class="col-sm-12 col-md-12 col-lg-4 d-flex align-items-center justify-content-center">
                    <img src="${phone.image}" class="img-fluid w-75 mx-auto" alt="Mobail Photo">
                </div>
                <div class="col-sm-12 col-md-12 col-lg-8">
                <div class="px-4 d-flex align-items-center justify-content-center py-3 flex-column">
                    <table class="overflow-auto table table-striped">
                       
                        <tr>
                            <td class="w-25">Name</td>
                            <td class="w-75">${phone.name ? phone.name : 'No Data Found' }</td>
                        </tr>
                        <tr>
                            <td class="w-25">Release Date</td>
                            <td class="w-75">${phone.releaseDate ? phone.releaseDate : 'No Data Found' }</td>
                        </tr>
                        <tr>
                            <td class="w-25">Brand</td>
                            <td class="w-75">${phone.brand ? phone.brand : 'No Data Found' }</td>
                        </tr>
                        <tr>
                            <th class="text-center" colspan="2">Main Feature</th>
                        </tr>
                        <tr>
                            <td class="w-25">Display Size</td>
                            <td class="w-75">${phone.mainFeatures?.displaySize ? phone.mainFeatures.displaySize : 'No Data Found' }</td>
                        </tr>
                        <tr>
                            <td class="w-25">Storage</td>
                            <td class="w-75">${phone.mainFeatures?.storage ? phone.mainFeatures.storage : 'No Data Found' }</td>
                        </tr>
                        <tr>
                            <td class="w-25">Chipset</td>
                            <td class="w-75">${phone.mainFeatures?.chipSet ? phone.mainFeatures.chipSet : 'No Data Found' }</td>
                        </tr>
                        <tr class="">
                            <td class="w-25">Memory</td>
                            <td class="w-75">${phone.mainFeatures?.memory ? phone.mainFeatures.memory : 'No Data Found' }</td>
                        </tr>
                        <tr>
                            <th class="text-center" colspan="2">Sensor Info</th>
                        </tr>
                        <tr>
                            <td class="w-25">Sensor</td>
                            <td class="w-75">${phone.mainFeatures.sensors.join(', ')}</td>
                        </tr>
                        <tr>
                            <th class="text-center" colspan="2">Connectivity</th>
                        </tr>
                        <tr>
                            <td class="w-25">WLAN</td>
                            <td class="w-75">${phone.others?.WLAN ? phone.others.WLAN : 'No Data Found'}</td>
                        </tr>
                        <tr>
                            <td class="w-25">Bluetooth</td>
                            <td class="w-75">${phone.others?.Bluetooth ? phone.others.Bluetooth  : 'No Data Found' }</td>
                        </tr>
                        <tr>
                            <td class="w-25">GPS</td>
                            <td class="w-75">${phone.others?.GPS ? phone.others.GPS : 'No Data Found' }</td>
                        </tr>
                        <tr>
                            <td class="w-25">NFC</td>
                            <td class="w-75">${phone.others?.NFC ? phone.others.NFC : 'No Data Found'  }</td>
                        </tr>
                        <tr>
                            <td class="w-25">Radio</td>
                            <td class="w-75">${phone.others?.Radio ? phone.others.Radio : 'No Data Found' }</td>
                        </tr>
                        <tr>
                            <td class="w-25">USB</td>
                            <td class="w-75">${phone.others?.USB ? phone.others.USB : 'No Data Found' }</td>
                        </tr>
                    </table>
                </div>
    </div>
</div>
<div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</div>
        `;
        div.classList.add('modal-content');
        singlePhone.appendChild(div);
}
//spinner
const spinner = status => {
    document.getElementById('spinner').style.display = status;       
}