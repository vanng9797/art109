for (let f = 1; f <= 100; f++) {
  let output = "";
  if (f % 3 == 0) output += "Fizz";
  if (f % 5 == 0) output += "Buzz";
  if (f % 3 == 0 || f % 5 == 0){
    console.log("FizzBuzz");
  }
  console.log(output || f);
}
