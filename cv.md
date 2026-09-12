# Evgenii

## Contact Information

- **Discord:** @shadjkez0r
- **GitHub:** [GitHub](https://github.com/shadjkez0r)
- **Telegram:** [Telegram](https://t.me/Evgtrn)

## Summary

I am a highly motivated programming student focused on backend technologies. I have practical experience working on team-based Java educational projects. Currently, I am deeply diving into functional programming using Scala and the Typelevel stack. I joined the RS School Full Stack course to broaden my perspective, learn frontend technologies, and build a strong foundation to become a T-shaped professional.

## Skills

`Java` `OOP` `Multithreading`
`Python` `FastAPI` `Async`
`Scala` `Functional Programming` `Cats-core` `Cats-Effect` `Doobie` `fs2` `http4s` `Circe`
`Git`

## Experience / Educational Projects

[**CLI Student Sorting & Management Application (Team Project - Aston)**](https://github.com/shadjkez0r/java-week5-final-project-by-team4)

- **Architecture & Data Structures:** Built a console application with strict Layered Architecture. Implemented custom dynamic arrays from scratch (`CustomList`) with native iterators, spliterators, and a seamless bridge to the Java 8 Stream API.
- **Algorithms & Concurrency:** Applied the Strategy pattern for dynamic sorting algorithms at runtime. Implemented thread-safe data filtering and occurrence counting using `parallelStream()` and `ConcurrentHashMap.newKeySet()`.
- **Java NIO:** Engineered thread-safe I/O operations for CSV parsing, data validation, and append-mode file writing.

[**Java Concurrency & Multithreading Playground**](https://github.com/shadjkez0r/java-week4-homework)

- **Concurrency Pitfalls:** Modeled and resolved classic multithreading problems including Deadlock and Livelock.
- **Synchronization:** Implemented strict sequential thread synchronization (Ping-Pong pattern) using object monitors (`wait`/`notify`) and `AtomicBoolean` to prevent race conditions.

[**GoF Design Patterns Showcase**](https://github.com/shadjkez0r/java-week3-homework)

- **Software Architecture:** Designed and implemented 6 classic Gang of Four (GoF) design patterns applied to non-trivial domain models.
- **Patterns Used:** _Adapter_ (legacy CSV to JSON), _Builder_ (fluent API), _Chain of Responsibility_ (validation pipelines), _Decorator_ (dynamic behavior extension), _Proxy_ (caching repository), and _Strategy_.

## Code Example (Scala + Cats)

Simple Chrono Trigger characters API Controller with http4s

```scala
package com.characters.infrastructure.http

import cats.effect.Async
import cats.syntax.all.*
import com.characters.service.CharacterService
import io.circe.{Decoder, Encoder}
import io.circe.generic.semiauto.*
import org.http4s.*
import org.http4s.circe.CirceEntityCodec.*
import org.http4s.dsl.Http4sDsl
import com.characters.domain.{Gender, TimeEra, Character}

case class CharacterRequestDTO(
    name: String,
    gender: Gender,
    timeEra: TimeEra,
    information: String
) derives Decoder,
      Encoder

case class CharacterResponseDTO(
    id: Long,
    name: String,
    gender: Gender,
    timeEra: TimeEra,
    information: String
) derives Encoder,
      Decoder

object CharacterMappers:
  extension (req: CharacterRequestDTO)
    def toDomain: Character = Character(
      id = 0L,
      name = req.name,
      gender = req.gender,
      timeEra = req.timeEra,
      information = req.information
    )

  extension (char: Character)
    def toDto: CharacterResponseDTO = CharacterResponseDTO(
      id = char.id,
      name = char.name,
      gender = char.gender,
      timeEra = char.timeEra,
      information = char.information
    )

class CharacterController[F[_]: Async](service: CharacterService[F])
    extends Http4sDsl[F]:
  import CharacterMappers.*

  val routes: HttpRoutes[F] = HttpRoutes.of[F] {
    case GET -> Root / "characters" =>
      for
        characters <- service.getAllCharacters()
        dtos = characters.map(_.toDto)
        resp <- Ok(dtos)
      yield resp

    case GET -> Root / "characters" / LongVar(id) =>
      for
        characterOpt <- service.getCharacterById(id)
        resp <- characterOpt match
          case Some(char) =>
            Ok(char.toDto)
          case None => NotFound("Character not found")
      yield resp

    case req @ POST -> Root / "characters" =>
      for
        createReq <- req.as[CharacterRequestDTO]
        createdChar <- service.createCharacter(createReq.toDomain)
        resp <- Created(createdChar.toDto)
      yield resp

    case req @ PUT -> Root / "characters" / LongVar(id) =>
      for
        updateReq <- req.as[CharacterRequestDTO]
        charToUpdate = updateReq.toDomain.copy(id = id)
        updatedOpt <- service.updateCharacter(charToUpdate)
        resp <- updatedOpt match
          case Some(updated) => Ok(updated.toDto)
          case None          => NotFound("Character not found")
      yield resp

    case DELETE -> Root / "characters" / LongVar(id) =>
      for
        deletedOpt <- service.deleteCharacter(id)
        resp <- deletedOpt match
          case Some(deleted) => Ok(deleted.toDto)
          case None          => NotFound("Character not found")
      yield resp
  }
```

## Education

M.T. Kalashnikov Izhevsk State Technical University 2020

## English Level

B1 (Reading technical documentation, basic conversational)
