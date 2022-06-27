import { Message } from 'discord.js'

declare namespace SamSpam {
  function log(message: Message, maxLog: number): void
  export function tooQuick(amount: number, interval: number): boolean
  export function sameMessages(amount: number, interval: number): boolean
}

export = SamSpam
