window.CAMPUS_DATA = {
  "version": "3.0.0-preview",
  "packaged_at": "2026-11-14",
  "services": [
    {
      "id": "S01",
      "category": "证件与教务",
      "title": "学生证补办换发",
      "keywords": "学生证 校园卡 丢失 补办 损坏",
      "intro": "学生证丢失或需要换发，可以先了解所在学院的受理安排，再按手册核对对应材料。",
      "condition_labels": {
        "card_reason": "办理原因"
      },
      "profile_options": {
        "card_reason": [
          "遗失",
          "损坏或信息变更"
        ]
      },
      "material_basis": "handbook",
      "materials": [
        {
          "id": "identity_document",
          "label": "个人身份证件（遗失分支）",
          "source": "H230",
          "when": {
            "field": "card_reason",
            "equals": "遗失"
          }
        },
        {
          "id": "old_student_card",
          "label": "学生证原件（损坏或信息变更分支）",
          "source": "H230",
          "when": {
            "field": "card_reason",
            "equals": "损坏或信息变更"
          }
        },
        {
          "id": "blue_photo_two",
          "label": "两张一寸蓝底免冠近照",
          "source": "H230"
        },
        {
          "id": "card_form",
          "label": "学生证补办、换发申请表（仅持有，不等于填妥/获批）",
          "source": "H230"
        }
      ],
      "workflow": [
        {
          "actor": "学生",
          "action": "向所在学院领取或核对申请表，按要求填写，先经班主任审核，再在学院办理审批、领取新的学生证。",
          "source": "H230"
        },
        {
          "actor": "学院教务办",
          "action": "携新证及审批通过的表统一到教务处学籍科办理；手册写每周五集中一次。学生本人无需据此自行前往教务处。",
          "source": "H230"
        }
      ],
      "gaps": [
        "该2024年流程当前是否仍沿用",
        "学院具体办公室、受理时段及是否有新增要求"
      ],
      "sources": [
        {
          "title": "学生办理学生证流程图",
          "printed_page": 228,
          "pdf_page": 230,
          "published_at": "2024-07",
          "source_type": "user_provided_handbook",
          "excerpt_verified": true,
          "excerpt": "遗失：携带1.个人身份证件；2.两张一寸蓝底免冠近照。损坏、信息变更：携带1.学生证原件；2.两张一寸蓝底免冠近照。到所在学院领取《学生证补办、换发申请表》，按表格要求填写，并办理审批手续。班主任审核通过后，到所在学院办理审批手续，领取新的学生证。由学院教务办携带新的学生证，凭审批通过的《学生证补办、换发申请表》统一到教务处学籍科办理手续，每周五集中办理一次。新生以班级为单位，按通知要求在规定的时间到教务处学籍科办理学生证。",
          "limitation": "原页标2024年7月制；本条摘录已对照原图，非全书人工校对；来自用户提供手册，未确认当前是否仍适用。"
        },
        {
          "title": "学生证补办换发申请表下载",
          "url": "https://jw.jxpu.edu.cn/info/1064/1247.htm",
          "published_at": "2026-06-05",
          "excerpt": "江西职业技术大学学生证补办换发申请表.doc",
          "limitation": "只核验表单页面和附件名，附件正文未读取"
        },
        {
          "title": "教务处首页",
          "url": "https://jw.jxpu.edu.cn/",
          "published_at": null,
          "excerpt": "教学管理平台",
          "limitation": "入口已读取，未进入登录后的个人系统"
        }
      ]
    },
    {
      "id": "S05-query",
      "category": "证件与教务",
      "title": "成绩查询入口",
      "keywords": "分数 查分 查询 成绩",
      "intro": "请从教务处官网进入教学管理平台，并自行完成登录。此网页无法读取你的个人成绩。",
      "condition_labels": {},
      "profile_options": {},
      "material_basis": null,
      "materials": [],
      "workflow": [],
      "gaps": [
        "登录后查询菜单与个人成绩"
      ],
      "sources": [
        {
          "title": "教务处首页",
          "url": "https://jw.jxpu.edu.cn/",
          "published_at": null,
          "excerpt": "教学管理平台",
          "limitation": "入口已读取，未进入登录后的个人系统"
        }
      ]
    },
    {
      "id": "S05-review",
      "category": "证件与教务",
      "title": "成绩复核",
      "keywords": "成绩 分数 异议 复核 改分",
      "intro": "对课程成绩有异议时，先确认课程归属部门及本学期复议时间，再准备书面申请。",
      "condition_labels": {},
      "profile_options": {},
      "material_basis": "handbook",
      "materials": [
        {
          "id": "written_grade_review",
          "label": "学生向课程归属部门提交的书面复议申请",
          "source": "H226"
        }
      ],
      "workflow": [
        {
          "actor": "学生",
          "action": "期末成绩录入后有异议，按手册在下一学期开学一周内向课程归属部门提出书面复议申请。",
          "source": "H226"
        },
        {
          "actor": "课程归属部门、任课教师及教务处",
          "action": "部门复核；如有误由任课教师提出修改申请，按图审批后由成绩管理员修改；学生等通知后核对。",
          "source": "H226"
        }
      ],
      "gaps": [
        "当前学期开学日期及是否沿用手册期限",
        "课程归属部门具体联系人和提交方式"
      ],
      "sources": [
        {
          "title": "学生课程成绩复核及修改流程图",
          "printed_page": 224,
          "pdf_page": 226,
          "published_at": "2024-07",
          "source_type": "user_provided_handbook",
          "excerpt_verified": true,
          "excerpt": "期末考试课程成绩录入教务系统后，学生对某门课程成绩有异议，须在下一学期开学一周内向课程归属部门提出书面复议申请。课程归属部门接受申请、组织复核；无误则反馈学生；有误则任课教师提出修改申请，课程归属部门领导签署意见，教务处领导审批。教务处成绩管理员在教务系统修改并存档，任课教师将申请复印件与原始成绩登记表一同存档并通知学生登录教务系统核对成绩。",
          "limitation": "原页标2024年7月制；本条摘录已对照原图，非全书人工校对；来自用户提供手册，未确认当前是否仍适用。"
        },
        {
          "title": "教务处首页",
          "url": "https://jw.jxpu.edu.cn/",
          "published_at": null,
          "excerpt": "教学管理平台",
          "limitation": "入口已读取，未进入登录后的个人系统"
        }
      ]
    },
    {
      "id": "S02",
      "category": "学籍与请假",
      "title": "休学申请",
      "keywords": "学籍 休学 生病",
      "intro": "休学事由不同，适用证明和期限可能不同。先向所在学院确认事由与当前受理要求。",
      "condition_labels": {
        "suspension_reason": "休学事由"
      },
      "profile_options": {
        "suspension_reason": [
          "伤病",
          "其他"
        ]
      },
      "material_basis": "handbook",
      "materials": [
        {
          "id": "suspension_form",
          "label": "休学申请（审批）表（须逐级审批，持有不等于获批）",
          "source": "H227"
        },
        {
          "id": "suspension_hospital_proof",
          "label": "县级以上医院证明（伤病休学）",
          "source": "H101",
          "when": {
            "field": "suspension_reason",
            "equals": "伤病"
          }
        }
      ],
      "workflow": [],
      "gaps": [
        "具体休学事由的证明要求与当前审批安排",
        "休学期限需结合学籍制度完整条款及当期规定核对"
      ],
      "sources": [
        {
          "title": "学生办理休学流程图",
          "printed_page": 225,
          "pdf_page": 227,
          "published_at": "2024-07",
          "source_type": "user_provided_handbook",
          "excerpt_verified": true,
          "excerpt": "因伤、病或精神疾病等身体原因经县级以上医院诊断，认为需较长时间（超过1.5个月）治疗休养者；请假及缺课累计超过1.5个月者（含理论教学、实习和生产劳动时间）；因某种特殊原因，本人申请或学院认为必须休学者。学生休学一次一般以一学年为期，累计不得超过两次；学期内休学应在本学期期末考试前办理。到所在学院或教务处学籍科领取《休学申请（审批）表》，按表顺序填写并逐级审批、签名加盖公章。凭审批后的表到教务处学籍科办理手续并变更学籍状态，原件留存；复印件本人保留一份，并送达财务处、所在学院教务办、班主任各一份。",
          "limitation": "原页标2024年7月制；本条摘录已对照原图，非全书人工校对；来自用户提供手册，未确认当前是否仍适用。"
        },
        {
          "title": "学籍异动相关申请表下载",
          "url": "https://jw.jxpu.edu.cn/info/1064/1227.htm",
          "published_at": "2026-06-05",
          "excerpt": "江西职业技术大学休学申请（审批）表.doc",
          "limitation": "只核验表单页面和附件名，附件正文未读取"
        },
        {
          "title": "江西职业技术大学学生学籍管理暂行办法",
          "url": "https://xxgk.jxpu.edu.cn/info/1171/1807.htm",
          "published_at": "2026-10-30",
          "excerpt": "详见附件。",
          "limitation": "页面写详见附件，制度正文未读取"
        },
        {
          "title": "学生学籍管理暂行办法第三十八至四十一条",
          "printed_page": 99,
          "pdf_page": 101,
          "published_at": null,
          "source_type": "user_provided_handbook",
          "excerpt_verified": true,
          "excerpt": "第三十八条：因伤、病或精神疾病等身体原因，休学由学生本人或监护人申请，附县级以上医院证明，经学院领导签署意见后报教务处审批。第三十九条：学生休学一般以一年为期。学期中办理休学者，该学期按休学计算。休学期满后仍不能复学，经本人申请、教务处批准，可继续申请休学，但累计不得超过两年。第四十条：休学创业的学生，学校可以为其保留学籍三年。第四十一条：在校生应征参加中国人民解放军（含中国人民武装警察部队），学校保留学籍至退役后两年。",
          "limitation": "该页未标制作日期；本条摘录已对照原图，非全书人工校对；来自用户提供手册，未确认当前是否仍适用。"
        }
      ]
    },
    {
      "id": "S02-resume",
      "category": "学籍与请假",
      "title": "复学申请",
      "keywords": "学籍 复学 入伍 退役 伤病",
      "intro": "准备复学时，先确认当前开学日期与学院受理安排，再按原休学事由核对证明。",
      "condition_labels": {
        "leave_reason": "原休学事由"
      },
      "profile_options": {
        "leave_reason": [
          "伤病",
          "入伍",
          "其他"
        ]
      },
      "material_basis": "handbook",
      "materials": [
        {
          "id": "resume_form",
          "label": "复学申请（审批）表",
          "source": "H228"
        },
        {
          "id": "health_proof",
          "label": "县级以上医院健康证明，并经校医院认定",
          "source": "H228",
          "when": {
            "field": "leave_reason",
            "equals": "伤病"
          }
        },
        {
          "id": "discharge_original_copy",
          "label": "退伍证原件及复印件",
          "source": "H228",
          "when": {
            "field": "leave_reason",
            "equals": "入伍"
          }
        }
      ],
      "workflow": [],
      "gaps": [
        "其他休学事由的有关证明",
        "当前开学时间及复学审批安排"
      ],
      "sources": [
        {
          "title": "学生办理复学流程图",
          "printed_page": 226,
          "pdf_page": 228,
          "published_at": "2024-07",
          "source_type": "user_provided_handbook",
          "excerpt_verified": true,
          "excerpt": "休学期满，应于每学期开学两周内持有关证明，向所在学院申请复学；因伤、病休学，复学时需县级以上医院健康证明并经校医院认定；因入伍休学，复学时需提供退伍证原件及复印件；学生在休学期间，如有严重违法乱纪行为者，可取消复学资格。到所在学院或教务处学籍科领取《复学申请（审批）表》，按表顺序填写并逐级审批、签名加盖公章。凭审批后的表到教务处学籍科办理手续并变更学籍状态，原件留存；复印件本人保留一份，并送达财务处、所在学院教务办、班主任各一份。",
          "limitation": "原页标2024年7月制；本条摘录已对照原图，非全书人工校对；来自用户提供手册，未确认当前是否仍适用。"
        },
        {
          "title": "学生学籍管理暂行办法第四十四条",
          "printed_page": 100,
          "pdf_page": 102,
          "published_at": null,
          "source_type": "user_provided_handbook",
          "excerpt_verified": true,
          "excerpt": "学生休学期满申请复学时，应于每学期开学两周内填写复学申请表，学院领导签署意见、教务处核准后，方可复学，办理报到、注册，编入专业相应年级学习。因伤、病或精神疾病等身体原因休学期满复学时，需提交县级以上医院诊断书证明已痊愈，并经学校医疗部门审核；因入伍保留学籍的学生复学，需提供退伍证原件及复印件。休学期间如有严重违法乱纪行为者，取消其复学资格。",
          "limitation": "该页未标制作日期；本条摘录已对照原图，非全书人工校对；来自用户提供手册，未确认当前是否仍适用。"
        }
      ]
    },
    {
      "id": "S09-leave",
      "category": "学籍与请假",
      "title": "学习时间请销假",
      "keywords": "请假 销假 病假 事假 公假",
      "intro": "学习时间请假需要区分因病、因事和因公；返校后还需要按规定完成销假。",
      "condition_labels": {
        "leave_type": "请假类型"
      },
      "profile_options": {
        "leave_type": [
          "因病",
          "因事",
          "因公"
        ]
      },
      "material_basis": "handbook",
      "materials": [
        {
          "id": "medical_leave_proof",
          "label": "二级甲等及以上医院病历、诊断证明或医嘱",
          "source": "H152",
          "when": {
            "field": "leave_type",
            "equals": "因病"
          }
        },
        {
          "id": "personal_leave_proof",
          "label": "证明人姓名、联系方式及有效证明材料（不向助手提供姓名或联系方式原文）",
          "source": "H152",
          "when": {
            "field": "leave_type",
            "equals": "因事"
          }
        },
        {
          "id": "official_leave_form",
          "label": "经公派部门负责人签字、部门盖章的因公请假审批单",
          "source": "H152",
          "when": {
            "field": "leave_type",
            "equals": "因公"
          }
        }
      ],
      "workflow": [],
      "gaps": [
        "节假日离返校、续假及其他情况须继续读印刷151—152页",
        "当前系统入口及学校最新安排"
      ],
      "sources": [
        {
          "title": "学生请销假管理办法：学习时间请销假",
          "printed_page": 150,
          "pdf_page": 152,
          "published_at": null,
          "source_type": "user_provided_handbook",
          "excerpt_verified": true,
          "excerpt": "学生在学习时间请假须通过“慧通江职”提交申请。因病请假须附二级甲等及以上医院病历、诊断证明或医嘱；因事请假须注明证明人姓名、联系方式及有效证明材料；因公请假须提供经公派部门负责人签字并加盖部门公章的《因公请假审批单》，并同步至班主任、任课老师、各学院教务科。上课、晚自习等学习时间请假2课时（含）以上且3天以内（含3天），由班主任审核批准。3天以上7天以内（含7天），班主任审核登记后报所在学院学生工作主管领导审核批准，学院学生工作办公室同步备案。7天以上，班主任审核、所在学院学生工作主管领导复核后，报学工部（处）审批备案。请假结束返校时，须在返校当日24:00前提交销假申请，由班主任审核确认后完成销假。",
          "limitation": "该页未标制作日期；本条摘录已对照原图，非全书人工校对；来自用户提供手册，未确认当前是否仍适用。"
        }
      ]
    },
    {
      "id": "S07",
      "category": "奖助与贷款",
      "title": "奖助学金与其他资助",
      "keywords": "奖学金 助学金 奖助 困难 勤工助学",
      "intro": "先确定具体奖助项目，再核对本学年通知。不同项目的条件、材料和期限不能混用。",
      "condition_labels": {},
      "profile_options": {},
      "material_basis": null,
      "materials": [],
      "workflow": [],
      "gaps": [
        "先确定具体项目/首贷续贷等分支并读取已收录章节",
        "当学年通知、金额、具体受理入口与截止日期须另行核对"
      ],
      "sources": [
        {
          "title": "学生奖学金、助学金、学费减免、助学贷款、勤工俭学的申请与管理规定",
          "url": "https://xxgk.jxpu.edu.cn/info/1171/1747.htm",
          "published_at": "2026-10-30",
          "excerpt": "10.江西职业技术大学生源地信用助学贷款实施细则.doc",
          "limitation": "10份附件目录已读取，细则正文未读取"
        }
      ]
    },
    {
      "id": "S08",
      "category": "奖助与贷款",
      "title": "生源地助学贷款",
      "keywords": "助学贷款 生源地 首贷 续贷",
      "intro": "先明确首贷或续贷，再核对当年贷款通知和受理渠道。现有入口不能代替完整申请要求。",
      "condition_labels": {},
      "profile_options": {},
      "material_basis": null,
      "materials": [],
      "workflow": [],
      "gaps": [
        "先确定具体项目/首贷续贷等分支并读取已收录章节",
        "当学年通知、金额、具体受理入口与截止日期须另行核对"
      ],
      "sources": [
        {
          "title": "学生奖学金、助学金、学费减免、助学贷款、勤工俭学的申请与管理规定",
          "url": "https://xxgk.jxpu.edu.cn/info/1171/1747.htm",
          "published_at": "2026-10-30",
          "excerpt": "10.江西职业技术大学生源地信用助学贷款实施细则.doc",
          "limitation": "10份附件目录已读取，细则正文未读取"
        }
      ]
    },
    {
      "id": "S10-calendar",
      "category": "教学安排",
      "title": "校历与考试安排",
      "keywords": "校历 考试 寒假 暑假 开学 报到",
      "intro": "学校已发布2026—2027学年校历。请区分毕业班与非毕业班，具体调整仍以学校后续通知为准。",
      "condition_labels": {},
      "profile_options": {},
      "material_basis": null,
      "materials": [],
      "workflow": [],
      "gaps": [
        "确认自己属于毕业班或非毕业班，以及需要查询的学期",
        "校历中的拟定活动安排和后续调整，以学校具体通知为准"
      ],
      "sources": [
        {
          "title": "江西职业技术大学2026-2027学年教学日历",
          "url": "https://www.jxpu.edu.cn/info/1023/34760.htm",
          "published_at": "2026-08-29",
          "document_date": null,
          "source_type": "official_website",
          "excerpt_verified": true,
          "excerpt": "2026—2027学年校历原图说明：毕业班期末考试为2026年11月28—29日；非毕业班为2027年1月4—10日；寒假2027年1月14日开始；第二学期在校生2027年2月22—23日报到注册，2月24日正式上课。后续调整以具体通知为准。",
          "limitation": "适用于2026—2027学年；原图说明已目视核对，后续调整以学校具体通知为准；非全部日期逐格转写。"
        }
      ]
    },
    {
      "id": "S11-electives",
      "category": "教学安排",
      "title": "网络公共选修课",
      "keywords": "公选课 选课 网络 课程 超星 智慧树",
      "intro": "已收录2025—2026学年第二学期专科公选课通知，可了解原通知口径；本学期选课安排需另查当期通知。",
      "condition_labels": {},
      "profile_options": {},
      "material_basis": null,
      "materials": [],
      "workflow": [],
      "gaps": [
        "当学期选课对象、开放时间和课程名单",
        "课程对应学习平台、学习与考核要求，以当期通知为准"
      ],
      "sources": [
        {
          "title": "关于2025-2026学年第二学期开展全校网络公共选修课选课的通知（专科）",
          "url": "https://jw.jxpu.edu.cn/info/1100/1147.htm",
          "published_at": "2026-05-28",
          "document_date": "2026-03-05",
          "source_type": "official_website",
          "excerpt_verified": true,
          "excerpt": "2025—2026学年第二学期专科公选课通知：每位学生最多选修3门课程；在指定选课时间内登录学校教务管理系统，“即选即得”“先选先得”，完成选课后不得退换；多次选修同一门课程学分不重复认定。",
          "limitation": "仅适用于2025—2026学年第二学期专科；网页发布日期与正文落款日期不同，两者分别记录；不推定本学期开放选课或沿用截止日。附件及学生名单未读取。"
        },
        {
          "title": "关于2025-2026学年第二学期全校网络公共选修课开课的通知（专科）",
          "url": "https://jw.jxpu.edu.cn/info/1100/1207.htm",
          "published_at": "2026-06-03",
          "document_date": "2026-03-17",
          "source_type": "official_website",
          "excerpt_verified": true,
          "excerpt": "2025—2026学年第二学期专科网络公选课开课通知：不同课程分别使用智慧树、超星、智慧职教MOOC学院平台；成绩60分以上者获得所选课程学分，不设补考。此为原文用语，不能自动解释为60分及以上或套用当前学期。",
          "limitation": "仅适用于2025—2026学年第二学期专科；网页发布日期与正文落款日期不同，两者分别记录；不推定本学期开放选课或沿用截止日。附件及学生名单未读取。"
        },
        {
          "title": "教务处首页",
          "url": "https://jw.jxpu.edu.cn/",
          "published_at": null,
          "excerpt": "教学管理平台",
          "limitation": "入口已读取，未进入登录后的个人系统"
        }
      ]
    }
  ],
  "official_library": [
    {
      "title": "教务处首页",
      "url": "https://jw.jxpu.edu.cn/",
      "publisher": "江西职业技术大学教务处",
      "published_at": null,
      "document_date": null,
      "level": "official_entry",
      "scope": "入口已读取，未进入登录后的个人系统"
    },
    {
      "title": "学生证补办换发申请表下载",
      "url": "https://jw.jxpu.edu.cn/info/1064/1247.htm",
      "publisher": "江西职业技术大学教务处",
      "published_at": "2026-06-05",
      "document_date": null,
      "level": "official_entry",
      "scope": "只核验表单页面和附件名，附件正文未读取"
    },
    {
      "title": "学籍异动相关申请表下载",
      "url": "https://jw.jxpu.edu.cn/info/1064/1227.htm",
      "publisher": "江西职业技术大学教务处",
      "published_at": "2026-06-05",
      "document_date": null,
      "level": "official_entry",
      "scope": "只核验表单页面和附件名，附件正文未读取"
    },
    {
      "title": "江西职业技术大学学生学籍管理暂行办法",
      "url": "https://xxgk.jxpu.edu.cn/info/1171/1807.htm",
      "publisher": "江西职业技术大学信息公开网",
      "published_at": "2026-10-30",
      "document_date": null,
      "level": "official_entry",
      "scope": "页面写详见附件，制度正文未读取；2026-11-14再次请求附件仍要求验证码，未绕过验证。"
    },
    {
      "title": "学生奖学金、助学金、学费减免、助学贷款、勤工俭学的申请与管理规定",
      "url": "https://xxgk.jxpu.edu.cn/info/1171/1747.htm",
      "publisher": "江西职业技术大学信息公开网",
      "published_at": "2026-10-30",
      "document_date": null,
      "level": "official_entry",
      "scope": "10份附件目录已读取，细则正文未读取；2026-11-14再次请求附件仍要求验证码，未绕过验证。"
    },
    {
      "title": "九江职业技术学院国家退役士兵助学金申请须知",
      "url": "https://xz.jxpu.edu.cn/JVTC_XG/Web/WebSite/Web/ShowInfo-LJw34Jmu^aahaacaf^M3^fdj.html",
      "publisher": "江西职业技术大学学工网",
      "published_at": "2023-09-12",
      "document_date": null,
      "level": "official_body",
      "scope": "仅作为2023年通知历史对照，不作为当前办理要求"
    },
    {
      "title": "退役学生学费减免注意事项",
      "url": "https://xz.jxpu.edu.cn/JVTC_XG/Web/WebSite/Web/ShowInfo-LJw34Jmu^aahaacaf^M3^fde.html",
      "publisher": "江西职业技术大学学工网",
      "published_at": "2023-03-07",
      "document_date": null,
      "level": "official_body",
      "scope": "仅作为2023年通知历史对照，不作为当前办理要求"
    },
    {
      "title": "应征入伍学费补偿注意事项",
      "url": "https://xz.jxpu.edu.cn/JVTC_XG/Web/WebSite/Web/ShowInfo-LJw34Jmu^aahaacaf^M3^fdd.html",
      "publisher": "江西职业技术大学学工网",
      "published_at": "2023-03-07",
      "document_date": null,
      "level": "official_body",
      "scope": "仅作为2023年通知历史对照，不作为当前办理要求"
    },
    {
      "title": "江西职业技术大学2026-2027学年教学日历",
      "url": "https://www.jxpu.edu.cn/info/1023/34760.htm",
      "publisher": "江西职业技术大学",
      "published_at": "2026-08-29",
      "document_date": null,
      "level": "official_image_excerpt",
      "scope": "适用于2026—2027学年；原图说明已目视核对，后续调整以学校具体通知为准；非全部日期逐格转写。"
    },
    {
      "title": "关于2025-2026学年第二学期开展全校网络公共选修课选课的通知（专科）",
      "url": "https://jw.jxpu.edu.cn/info/1100/1147.htm",
      "publisher": "江西职业技术大学教务处",
      "published_at": "2026-05-28",
      "document_date": "2026-03-05",
      "level": "official_body",
      "scope": "仅适用于2025—2026学年第二学期专科；网页发布日期与正文落款日期不同，两者分别记录；不推定本学期开放选课或沿用截止日。附件及学生名单未读取。"
    },
    {
      "title": "关于2025-2026学年第二学期全校网络公共选修课开课的通知（专科）",
      "url": "https://jw.jxpu.edu.cn/info/1100/1207.htm",
      "publisher": "江西职业技术大学教务处",
      "published_at": "2026-06-03",
      "document_date": "2026-03-17",
      "level": "official_body",
      "scope": "仅适用于2025—2026学年第二学期专科；网页发布日期与正文落款日期不同，两者分别记录；不推定本学期开放选课或沿用截止日。附件及学生名单未读取。"
    }
  ]
};
