export function splitId(id: string) {
  const newId = id.toLocaleLowerCase().split("-");
  return `${newId[0]}-${newId[1]}...`;
}

export function splitSuperId(id: string) {
  const newId = id.toLocaleLowerCase().split("-");
  return `${newId[0]}-${newId[1]}-${newId[2]}...`;
}

export function splitMegaId(id: string) {
  const newId = id.toLocaleLowerCase().split("-");
  return `${newId[0]}-${newId[1]}-${newId[2]}-${newId[4]}...`;
}

class Split {
  id(id: string) {
    const newId = id.toLocaleLowerCase().split("-");
    return `${newId[0]}-${newId[1]}...`;
  }
  superId(id: string) {
    const newId = id.toLocaleLowerCase().split("-");
    return `${newId[0]}-${newId[1]}-${newId[2]}...`;
  }
  MegaId(id: string) {
    const newId = id.toLocaleLowerCase().split("-");
    return `${newId[0]}-${newId[1]}-${newId[2]}-${newId[4]}...`;
  }
  first(name: string) {
    const partesNome = name.toLocaleUpperCase().split(" ");
    return partesNome[0][0]
  }
  name(name: string) {
    const partesNome = name.toLocaleUpperCase().split(" ");
    return partesNome[0][0] + partesNome[partesNome.length - 1][0];
  }
  name2(name: string) {
    const partesNome = name.toLocaleLowerCase().split(" ");
    const first = partesNome[0]
      .split("")
      .map((e, i) => {
        if (i != 0) {
          return e;
        } else {
          return e.toLocaleUpperCase()
        }
      })
      .join("");
    const last = partesNome[partesNome.length - 1]
      .split("")
      .map((e, i) => {
        if (i != 0) {
          return e;
        } else {
          return e.toLocaleUpperCase()
        }
      })
      .join("");

    return `${first} ${last}`;
  }
  data(data: Date) {
    return data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  }
  matricula(mat:string){
  return mat
        .split("")
        .map((e,i)=>{ if(i===2 || i===4 || i===6){ return `-${e}` } else return e }).join("")
  }
}
export const split = new Split();
