
function getELE(selector) {
    return document.querySelector(selector);
}

// Khi click btn add thì hiện button dưới modal
function setBtnAdd() {
    getELE('#btnThemDT').addEventListener('click', function() {
        getELE("#myModal .modal-footer").innerHTML = `
            <button onclick="addPersonData()" class="btn btn-success">Thêm đối tượng</button>
        `;
    })
}
setBtnAdd();

// Click vào loại person nào thì hiện các input theo person
function setType() {
    const loaiDoiTuong = getELE('#loaiDT');

    loaiDoiTuong.addEventListener('change', function() {

        if (loaiDoiTuong.value === 'student') {
            renderListInput(".form-group.form-all, .form-group.form-student")
        } else if (loaiDoiTuong.value === 'employee') {
            renderListInput(".form-group.form-all, .form-group.form-employee")
        } else if (loaiDoiTuong.value === 'customer') {
            renderListInput(".form-group.form-all, .form-group.form-customer")
        } else {
            return;
        }
    })
}
setType()

// Lọc Person
function renderBySelect() {
    const SelectValue = getELE('#SelectParent');

    SelectValue.addEventListener('change', function() {
        const newArray = ListData.Person.filter((item) => {
            if (SelectValue.value === 'student') {
                return item.type === 'student';
            } else if (SelectValue.value === 'employee') {
                return item.type === 'employee';
            } else if (SelectValue.value === 'customer') {
                return item.type === 'customer';
            }
        })
        renderTable(newArray)
    })
}
renderBySelect()

// Render list input theo từng person
function renderListInput(mangClass) {
    let mangInputAll = document.querySelectorAll('.form-group');
    let mangInput = document.querySelectorAll(mangClass);

    if (mangInput) {
        for (var i = 1;i<mangInputAll.length;i++) {
            mangInputAll[i].style.display = 'none';
        }

        for (var i = 0;i<mangInput.length;i++) {
            mangInput[i].style.display = 'block';
        }
    }
}

// Tạo lớp đối tượng
let ListData = new ListPerson();

// Render table
function renderTable(mang) {
    var content = "";

    mang.map((item) => {

        if (item.type === 'student') {
            content += `
            <tr>
                <td></td>
                <td>${item.hoTen}</td>
                <td>${item.diaChi}</td>
                <td>${item.email}</td>
                <td>${item.type}</td>
                <td>${item.diemToan}</td>
                <td>${item.diemLy}</td>
                <td>${item.diemHoa}</td>
                <td>${item.dtb}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>  
                <td>
                    <button onclick="removePersonData('${item.hoTen}')" class="btn btn-primary"><i class="fa-solid fa-xmark"></i></button>
                    <button data-toggle="modal"
                    data-target="#myModal" onclick="showUpdate('${item.hoTen}')" class="btn btn-success"><i class="fa-solid fa-pen"></i></button>
                </td>
            </tr>
        `;
        getELE('#tblDanhSachDT').innerHTML = content;
        }
        
        else if (item.type === 'employee') {
            content += `
            <tr>
                <td></td>
                <td>${item.hoTen}</td>
                <td>${item.diaChi}</td>
                <td>${item.email}</td>
                <td>${item.type}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>${item.soNgayLam}</td>
                <td>${item.luong}</td>
                <td>${item.total}</td>
                <td></td>
                <td></td>  
                <td></td>  
                <td></td>  
                <td>
                    <button onclick="removePersonData('${item.hoTen}')" class="btn btn-primary"><i class="fa-solid fa-xmark"></i></button>
                    <button data-toggle="modal"
                    data-target="#myModal" onclick="showUpdate('${item.hoTen}')" class="btn btn-success"><i class="fa-solid fa-pen"></i></button>
                </td>
            </tr>
        `;
        getELE('#tblDanhSachDT').innerHTML = content;
        }

        else if (item.type === 'customer') {
            content += `
            <tr>
                <td></td>
                <td>${item.hoTen}</td>
                <td>${item.diaChi}</td>
                <td>${item.email}</td>
                <td>${item.type}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>  
                <td></td>  
                <td></td>  
                <td>${item.tenCongTy}</td>
                <td>${item.triGiaHoaDon}</td>
                <td>${item.danhGia}</td>  
                <td>
                    <button onclick="removePersonData('${item.hoTen}')" class="btn btn-primary"><i class="fa-solid fa-xmark"></i></button>
                    <button data-toggle="modal"
                    data-target="#myModal" onclick="showUpdate('${item.hoTen}')" class="btn btn-success"><i class="fa-solid fa-pen"></i></button>
                </td>
            </tr>
        `;
        getELE('#tblDanhSachDT').innerHTML = content;
        }
    });
}

// Reset Value
function resetValue() {
    let allInput = document.querySelectorAll('.form-group .form-control');
    for (var i = 1; i< allInput.length;i++) {
        allInput[0].value = '0';
        allInput[i].value = '';
    }
}

function setLocalStorage(mang) {
    localStorage.setItem("DSPS", JSON.stringify(mang))
}

function getLocalStorage() {
    if (localStorage.getItem("DSPS") !== null) {
        ListData.Person = JSON.parse(localStorage.getItem("DSPS"));
        renderTable(ListData.Person)
    }
}
getLocalStorage()

// Thêm data
function addPersonData() {

    let hoTen = getELE("#Ten").value;
    let diaChi = getELE("#DiaChi").value;
    let email = getELE("#Email").value;
    let type = getELE('#loaiDT').value;
    let diemToan = Number(getELE("#Toan").value);
    let diemLy = Number(getELE("#Ly").value);
    let diemHoa = Number(getELE("#Hoa").value);
    let soNgayLam = getELE("#soNgayLam").value;
    let luong = getELE("#luong").value;
    let tenCongTy = getELE("#tenCty").value;
    let triGiaHoaDon = getELE("#giaHoaDon").value;
    let danhGia = getELE("#danhGia").value;

    if (type === 'student') {
        let student = new Student(diemToan, diemLy, diemHoa, hoTen, diaChi, email, type);
        student.tinhDTB();

        ListData.addPerson(student);
    } else if (type === 'employee') {
        let employee = new Employee(soNgayLam, luong, hoTen, diaChi, email, type)
        employee.tinhLuong();

        ListData.addPerson(employee);
    } else if (type === 'customer') {
        let customer = new Customer(tenCongTy, triGiaHoaDon, danhGia, hoTen, diaChi, email, type)

        ListData.addPerson(customer);
    }
    resetValue();
    renderTable(ListData.Person);
    setLocalStorage(ListData.Person)
}

// Xóa data
function removePersonData(name) {
    ListData.removePerson(name);
    renderTable(ListData.Person);
}

// Cập nhật
function updatePerson() {
    let hoTen = getELE("#Ten").value;
    let diaChi = getELE("#DiaChi").value;
    let email = getELE("#Email").value;
    let type = getELE('#loaiDT').value;
    let diemToan = Number(getELE("#Toan").value);
    let diemLy = Number(getELE("#Ly").value);
    let diemHoa = Number(getELE("#Hoa").value);
    let soNgayLam = getELE("#soNgayLam").value;
    let luong = getELE("#luong").value;
    let tenCongTy = getELE("#tenCty").value;
    let triGiaHoaDon = getELE("#giaHoaDon").value;
    let danhGia = getELE("#danhGia").value;

    if (type === 'student') {
        let student = new Student(diemToan, diemLy, diemHoa, hoTen, diaChi, email, type);
        student.tinhDTB();

        ListData.capNhatPerson(student)
        setLocalStorage(ListData.Person)
        getLocalStorage()
    } else if (type === 'employee') {
        let employee = new Employee(soNgayLam, luong, hoTen, diaChi, email, type)
        employee.tinhLuong();

        ListData.capNhatPerson(employee)
        setLocalStorage(ListData.Person)
        getLocalStorage()
    } else if (type === 'customer') {
        let customer = new Customer(tenCongTy, triGiaHoaDon, danhGia, hoTen, diaChi, email, type)
        ListData.capNhatPerson(customer)
        setLocalStorage(ListData.Person)
        getLocalStorage()
    }
}

// Click button xem thì hiện info
function showUpdate(name) {

    var index = ListData.findIndexPerson(name);

    if (index != -1) {
        getELE("#Ten").value = ListData.Person[index].hoTen;
        getELE("#DiaChi").value = ListData.Person[index].diaChi
        getELE("#Email").value = ListData.Person[index].email
        getELE('#loaiDT').value = ListData.Person[index].type
        getELE("#Toan").value = ListData.Person[index].diemToan
        getELE("#Ly").value = ListData.Person[index].diemLy
        getELE("#Hoa").value = ListData.Person[index].diemHoa
        getELE("#soNgayLam").value = ListData.Person[index].soNgayLam
        getELE("#luong").value = ListData.Person[index].luong
        getELE("#tenCty").value = ListData.Person[index].tenCongTy
        getELE("#giaHoaDon").value = ListData.Person[index].triGiaHoaDon
        getELE("#danhGia").value = ListData.Person[index].danhGia
    }

    getELE('#myModal .modal-footer').innerHTML = `
    <button onclick="updatePerson()" class="btn btn-primary">Cập nhật</button>
    `
}


