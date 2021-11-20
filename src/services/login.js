import base from "./airtable";

export default async function logIn(id, password, isTeacher) {
  const table = isTeacher ? "teacher" : "student";
  await base(table)
    .select({
      filterByFormula: `{id} = '${id}'`,
    })
    .firstPage(function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      if (records.length === 0) {
        alert("아이디가 존재하지 않습니다.");
      } else if (records[0].fields.password !== password) {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        setCookie("id", records[0].fields.id);
        setCookie("name", records[0].fields.name);
        if (!isTeacher) {
          setCookie("teacher", records[0].fields.teacherId);
          location.replace = "/homeworks";
        }
      }
    });
}
