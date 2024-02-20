# Interfaces for VisecaOne SA

## Interfaces overview

```mermaid
C4Component
title Information Flow diagram

Container_Boundary(component, Component) {
    Component(VisecaOne SA, VisecaOne SA, , )
    Component(VisecaOne SA, VisecaOne SA, , )
    Component(VisecaOne SA, VisecaOne SA, , )
    Component(VisecaOne SA, VisecaOne SA, , )
}

Container_Boundary(inbound, Inbound information flows) {
    Component(VisecaOne Push Notification Consumer, VisecaOne Push Notification Consumer, , )
    Component(VisecaOne Push Notification Consumer, VisecaOne Push Notification Consumer, , )
    Component(VisecaOne AUTH API, VisecaOne AUTH API, , )
    Component(VisecaOne Base Service, VisecaOne Base Service, , )
    Rel(VisecaOne Push Notification Consumer, VisecaOne SA, realtime, JSON/HTTPS)
    Rel(VisecaOne Push Notification Consumer, VisecaOne SA, realtime, JSON/HTTPS)
    Rel(VisecaOne AUTH API, VisecaOne SA, realtime, JSON/HTTPS)
    Rel(VisecaOne Base Service, VisecaOne SA, realtime, JSON/HTTPS)
}

Container_Boundary(outbound, Outbound information flows) {
    Component(RabbitMQ VisecaOne.Authentication.v1 Exchange, RabbitMQ VisecaOne.Authentication.v1 Exchange, , )
    Component(RabbitMQ VisecaOne.Channel.v1 Exchange, RabbitMQ VisecaOne.Channel.v1 Exchange, , )
    Rel(VisecaOne SA, RabbitMQ VisecaOne.Authentication.v1 Exchange, realtime, JSON/AMQP)
    Rel(VisecaOne SA, RabbitMQ VisecaOne.Channel.v1 Exchange, realtime, JSON/AMQP)
}
```

## Interface list

| Source       | Target       |  Description    | Protocol      | Format       | Frequency     | Direction     |
|--------------|--------------|-----------------|---------------|--------------|---------------|---------------|
     | VisecaOne Push Notification Consumer | VisecaOne SA | ONE notification processing | HTTPS | JSON | realtime | bi-directional |
     | VisecaOne Push Notification Consumer | VisecaOne SA | ONE authentication request processing | HTTPS | JSON | realtime | bi-directional |
     | VisecaOne AUTH API | VisecaOne SA | Second factor authentication | HTTPS | JSON | realtime | bi-directional |
     | VisecaOne Base Service | VisecaOne SA | Channel management | HTTPS | JSON | realtime | bi-directional |
    | VisecaOne SA | RabbitMQ VisecaOne.Authentication.v1 Exchange | Notify authentication events | AMQP | JSON | realtime | outgoing |
    | VisecaOne SA | RabbitMQ VisecaOne.Channel.v1 Exchange | Notify channel events | AMQP | JSON | realtime | outgoing |

