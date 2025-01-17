const escapeStringRegexp = require('escape-string-regexp')

module.exports = {
  messageLog: [],
  message: '',

  removeArrayItem: function(id){
    this.messageLog = this.messageLog.filter(item => item.author != id)
  },
  /**
   * @description listen/attach detector to the chat
   * @param message - Discord.js message object
   * @param maxLog - Maximum amount of recorded messages log
   */
  log: function(message, maxLog){
    this.message = message
    this.messageLog.push({
      author: message.author.id,
      content: message.content.toLowerCase(),
      timeStamp: Date.now()
    })

    //cleaning up the log
    if (this.messageLog.length > maxLog) this.messageLog.shift()
  },

  /**
   * @param amount - Treshold of messages in interval
   * @param interval - The interval (in millisecond)
   */
  tooQuick: function(amount, interval){
    // getting the messages of last message' author from log
    let msg = this.messageLog.filter(log =>log.author == this.message.author.id)

    // ignore it if the logs are bellow treshold
    if(msg.length < amount) return false

    // space-time continum manipulation...
    let lastTimeStamp = msg[msg.length - amount].timeStamp
    let currentTimeStamp = msg[msg.length - 1].timeStamp
    let msgInterval = currentTimeStamp - lastTimeStamp
    // trigger and clear this user from array
    if (msgInterval <= interval) {
      this.removeArrayItem(this.message.author.id)
      return true
    }
    return false
  },
  /**
   * @param amount - Max treshold of same messages
   * @param interval - The interval (in millisecond)
   */
  sameMessages: function(amount, interval){
    // getting the messages of last message' author from log.. again

    // only get messages from within the interval given
    let msg = this.messageLog.filter(log => (new Date) - log.timeStamp < interval)
    // only messages from the current author
    msg = msg.filter(log => log.author == this.message.author.id)

    // message that just sent
    let currentMsg = this.message.content.toLowerCase()
    // check if its same with other messages

    // escape regex string
    currentMsg = escapeStringRegexp(currentMsg)
    let occurance = msg.filter(prev => prev.content == currentMsg).length

    if (occurance >= amount) return true
    return false
  }
}
