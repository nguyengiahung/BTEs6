
class Person{
    constructor(hoTen, diaChi, email, type) {
        // this.id = id;
        this.hoTen = hoTen;
        this.diaChi = diaChi;
        this.email = email;
        this.type = type;
    }
}

class ListPerson{

    Person = [];

    addPerson(person) {
        this.Person.push(person);
    }

    findIndexPerson(name) {
        // Tìm id của sv trong mangSV trùng với id button Xóa
        // Neu ko tim thay thi = -1
        var indexFind = -1;

        indexFind = this.Person.findIndex(function(item) {
            return item.hoTen == name;
        });

        return indexFind;
    }

    removePerson(name) {
        let index = this.findIndexPerson(name);

        if (index != -1) {
            this.Person.splice(index, 1);
        }
    }

    capNhatPerson(item) {
        var index = this.findIndexPerson(item.hoTen);
        
        if (index != -1) {
            this.Person[index] = item;
        }
        
    }
}