const struct1=(data)=>data;
const struct2=(data)=>data;
const struct3=(data)=>data;
const struct4=(data)=>{ 
    data.question_answer_list = Array.isArray(data.question_answer_list) ? data.question_answer_list : [data.question_answer_list];
    return data;
};

export default {
    struct1,
    struct2,
    struct3,
    struct4
}