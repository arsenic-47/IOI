String.prototype[__filename] = function () {
    let msString = this
    msString = msString.replace("ms", ` millisecond${msString.startsWith("1") ? '' : 's'}`)
    msString = msString.replace("s", ` second${msString.startsWith("1") ? '' : 's'}`)
    msString = msString.replace("m", ` minute${msString.startsWith("1") ? '' : 's'}`)
    msString = msString.replace("h", ` hour${msString.startsWith("1") ? '' : 's'}`)
    msString = msString.replace("d", ` day${msString.startsWith("1") ? '' : 's'}`)
    msString = msString.replace("w", ` week${msString.startsWith("1") ? '' : 's'}`)
    return msString
  }