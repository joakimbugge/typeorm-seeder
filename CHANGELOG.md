### [1.2.1](https://github.com/joakimbugge/typeorm-seeder/compare/v1.2.0...v1.2.1) (2022-03-22)


### Bug fixes

* bump typeorm peer-dependency to ^0.3.2 ([28980a6](https://github.com/joakimbugge/typeorm-seeder/commit/28980a633a8a7a7b8063a26616d783b41bda0eab))

## [1.2.0](https://github.com/joakimbugge/typeorm-seeder/compare/v1.1.1...v1.2.0) (2022-03-22)


### Features

* bump typeorm peer-dependency to ^0.3.1 ([5027c7a](https://github.com/joakimbugge/typeorm-seeder/commit/5027c7aecc1a7cd3ed8e41d145ab62307af0c098))
* replace optional `Connection` with required `DataSource` ([b79a650](https://github.com/joakimbugge/typeorm-seeder/commit/b79a6507bde615d911b59e655847ea552d78e0f2))

### [1.1.1](https://github.com/joakimbugge/typeorm-seeder/compare/v1.1.0...v1.1.1) (2022-02-05)


### Bug fixes

* constructor argument type of `SeederConstructor` is now any[] ([#82](https://github.com/joakimbugge/typeorm-seeder/issues/82)) ([8a5b556](https://github.com/joakimbugge/typeorm-seeder/commit/8a5b5566f8cc33df4b38cdbb7c13a54b47a5eb59))

## [1.1.0](https://github.com/joakimbugge/typeorm-seeder/compare/v1.0.0...v1.1.0) (2022-02-04)


### Features

* add onEachComplete event to forSeeders() ([#80](https://github.com/joakimbugge/typeorm-seeder/issues/80)) ([db19aa3](https://github.com/joakimbugge/typeorm-seeder/commit/db19aa3ac6bccf740a7596b7e533a171270bf0e1))


### Bug fixes

* rename type SeederCreator to SeederRunner ([#81](https://github.com/joakimbugge/typeorm-seeder/issues/81)) ([7081bd7](https://github.com/joakimbugge/typeorm-seeder/commit/7081bd7ece688c75665f11fccaa129e74f142efc))

## 1.0.0 (2022-01-28)


### Features

* initial commit ([786187a](https://github.com/joakimbugge/typeorm-seeder/commit/786187a0a8012bcaf352ed58462451b914823276))
* support inherited entities ([57a8d13](https://github.com/joakimbugge/typeorm-seeder/commit/57a8d1323f08ceb44ada7f347c1cabbc1ba98b3e))


### Bug fixes

* change namespace from birdbrain to airhead ([61c51b6](https://github.com/joakimbugge/typeorm-seeder/commit/61c51b69a517015c55c5f50cbd3fae7ec3ea206e))
* get connection from entity only when persisting ([871f543](https://github.com/joakimbugge/typeorm-seeder/commit/871f5434efd4ec2edf51d5f5d6b7094b9ca5de93))
