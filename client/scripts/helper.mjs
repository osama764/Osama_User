function getDevice(transcript, commands, status) {
  const transcriptSplit = transcript.split(" ");

  const commandIndex = transcriptSplit.findIndex((word) =>
    commands.includes(word)
  );
  if (commandIndex === -1) return { Name: "", status: false, nameImage: "" };

  const deviceName = transcriptSplit.slice(commandIndex + 1).join(" ");
  // if (!transcriptSplit.includes(deviceName)) {
  //   return { Name: "", status: false, nameImage: "" };
  // }

  return { Name: deviceName, status, nameImage: "" };
}

function getTransctiptWithoutTime({
  transcript,
  transcriptSplit,
  time,
  timeDate,
  dayStatusCommands,
}) {
  let clearTranscript = transcript.replace(time[0], "").trim();

  const nightDayIndex = transcriptSplit.findIndex((word) =>
    dayStatusCommands.night.includes(word)
  );

  const dayIndex = transcriptSplit.findIndex((word) =>
    dayStatusCommands.day.includes(word)
  );

  const hourWordIndex = transcriptSplit.findIndex((word) =>
    dayStatusCommands.hour.includes(word)
  );

  if (nightDayIndex !== -1) {
    timeDate = new Date(timeDate).setHours(new Date(timeDate).getHours() + 12);
  }

  if (nightDayIndex !== -1) {
    clearTranscript = clearTranscript
      .replace(transcriptSplit[nightDayIndex], "")
      .trim();
  }

  if (dayIndex !== -1) {
    clearTranscript = clearTranscript
      .replace(transcriptSplit[dayIndex], "")
      .trim();
  }

  if (hourWordIndex !== -1) {
    clearTranscript = clearTranscript
      .replace(transcriptSplit[hourWordIndex], "")
      .trim();
  }

  return { time: timeDate, clearTranscript };
}

function getSchduleTime(transcript, dayStatusCommands) {
  const transcriptSplit = transcript.split(" ");
  const TIME_REGX = /\d+:\d+/;

  const time = transcript.match(TIME_REGX);
  if (!time || !time[0]) return;

  const timeByHourAndMins = time[0].trim().split(":");
  let timeDate = new Date().setHours(
    timeByHourAndMins[0],
    timeByHourAndMins[1]
  );

  const transctiptWithoutTime = getTransctiptWithoutTime({
    transcript,
    transcriptSplit,
    time,
    timeDate,
    dayStatusCommands,
  });

  return {
    time: transctiptWithoutTime.time,
    clearTranscript: transctiptWithoutTime.clearTranscript,
  };
}

function getRoomName(transcript, rooms) {
  const transcriptSplit = transcript.split(" ");
  const roomNameIndex = transcriptSplit.findIndex((word) =>
    rooms.includes(word)
  );
  if (roomNameIndex === -1) return "";

  const roomName = transcriptSplit[roomNameIndex + 1];
  if (!roomName) return "";

  console.log({ transcriptSplit });

  const inCharIndex = transcriptSplit.findIndex(
    (word) => word === "في" || word === "فى"
  );

  const clearTranscript = transcriptSplit.slice(0, inCharIndex).join(" ");

  return { roomName, clearTranscript };
}


function getClearString(word) {
  const charsForReplace = {
    ة: "ه",
    أ: "ا",
    إ: "ا",
    لأ: "لا",
  };

  const specialCharsPattern = /[.,،؟]/g;

  const clearWord = word
    .replace(specialCharsPattern, "")
    .split("")
    .map((word) => {
      if (charsForReplace[word]) return charsForReplace[word];

      return word;
    })
    .join("")
    .trim();

  return clearWord;
}

export { getDevice, getSchduleTime, getClearString, getRoomName };
