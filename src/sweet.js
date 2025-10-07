import Swal from "sweetalert2";

const Success=(txt,action)=>{
    Swal.fire({
        title: 'Successful!',
        text: txt,
        icon: 'success',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            action()
        }
    });
}

const Failed=(txt,action)=>{
    Swal.fire({
        title: 'Failed!',
        text: txt,
        icon: 'danger',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            action()
        }
    });
}

export {Success,Failed}