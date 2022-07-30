## [1.3.0](https://github.com/joakimbugge/typeorm-seeder/compare/v1.2.1...v1.3.0) (2022-07-30)


### Features

* force shallow relation seeding to avoid endless loop ([ae2da0a](https://github.com/joakimbugge/typeorm-seeder/commit/ae2da0ab5bc27be8892deb01ca58a63f7f2b59cf))


### Dependencies

* **deps:** bump @hapi/topo from 5.1.0 to 6.0.0 ([#195](https://github.com/joakimbugge/typeorm-seeder/issues/195)) ([ca50d69](https://github.com/joakimbugge/typeorm-seeder/commit/ca50d692226012ad42f60feaafec949ef96c709b))
* **deps:** bump glob from 7.2.0 to 8.0.3 ([#196](https://github.com/joakimbugge/typeorm-seeder/issues/196)) ([795f025](https://github.com/joakimbugge/typeorm-seeder/commit/795f025615e6011335fe25a4a0678cf9c6f1566c))
* **deps:** bump npm from 8.4.0 to 8.15.1 ([#230](https://github.com/joakimbugge/typeorm-seeder/issues/230)) ([f3d4a3c](https://github.com/joakimbugge/typeorm-seeder/commit/f3d4a3c30b215cdee8c45cca232d3566ad43e186))
* **deps:** bump semver-regex from 3.1.3 to 3.1.4 ([#231](https://github.com/joakimbugge/typeorm-seeder/issues/231)) ([b2fa350](https://github.com/joakimbugge/typeorm-seeder/commit/b2fa350ebbacdbc99f8f5d985694022d264efaef))
* **deps:** bump terser from 5.10.0 to 5.14.2 ([#229](https://github.com/joakimbugge/typeorm-seeder/issues/229)) ([c7ccba3](https://github.com/joakimbugge/typeorm-seeder/commit/c7ccba393dd6ba697fb97bfe561fa4fe6fee16c5))
* **deps:** bump tslib from 2.3.1 to 2.4.0 ([#166](https://github.com/joakimbugge/typeorm-seeder/issues/166)) ([fac7730](https://github.com/joakimbugge/typeorm-seeder/commit/fac773056076d9521f5e904a198e14dbd5b54843))

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
