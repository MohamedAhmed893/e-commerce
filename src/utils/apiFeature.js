export class ApiFeature {
    constructor(mongooseQuery,queryString){
        this.mongooseQuery=mongooseQuery
        this.queryString=queryString
    }
    paginate(){
           //pagination ==============
    let PAGE_NUMBER = this.queryString.page
    PAGE_NUMBER = PAGE_NUMBER * 1 || 1

    if (PAGE_NUMBER <= 0 || !PAGE_NUMBER) PAGE_NUMBER = 1
    
    let limit =  5
    let skip = (PAGE_NUMBER - 1) * limit
    this.PAGE_NUMBER =PAGE_NUMBER
    this.limit =limit

    this.mongooseQuery.skip(skip).limit(limit)
    return this
    }
    filter(){
        let filterObj = {...this.queryString} // deep copy
        let excludedQuery = ['page', 'sort', 'fields', 'keyword']
        excludedQuery.forEach((q) => {
            delete filterObj[q]
        })
        filterObj =JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}` )
        filterObj =JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this
    }
    sort(){
         //sort ====================
    if(this.queryString.sort){
        let sortedBy =this.queryString.sort.split(',').join(' ')
        this.mongooseQuery.sort(sortedBy)
    }
    return this
    }
    search(){
          //serch ====================
    if(this.queryString.keyword){
        this.mongooseQuery.find({$or:[{name:{$regex:this.queryString.keyword,$options:'i'}},{descrition:{$regex:this.queryString.keyword,$options:'i'}}]})
    }
    return this
    }
    fields(){
        //fields
    if(this.queryString.fields){
        let fields =this.queryString.fields.split(',').join(' ')
        this.mongooseQuery.select(fields)
    }
    return this
    }
}