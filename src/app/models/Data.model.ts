interface MyDataSegment {
    label: String,
    backgroundColor: String,
    borderColor: String,
    data: number[],
} 

export class MyData {
    public labels: String[];
    public datasets: MyDataSegment[];
}