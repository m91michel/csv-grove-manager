import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Download, Upload, X, ArrowUpDown, Edit2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CSVTool = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [separator, setSeparator] = useState(',');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    if (sortColumn !== null) {
      const sortedData = [...data].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
      setData(sortedData);
    }
  }, [sortColumn, sortDirection]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split('\n');
      const headers = lines[0].split(separator);
      const rows = lines.slice(1).map(line => line.split(separator));
      setHeaders(headers);
      setData(rows);
    };
    reader.readAsText(file);
  };

  const handleCellEdit = (rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  const handleHeaderEdit = (index, value) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  const addRow = () => {
    const newRow = new Array(headers.length).fill('');
    setData([...data, newRow]);
  };

  const deleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const addColumn = () => {
    const newHeader = `Column ${headers.length + 1}`;
    setHeaders([...headers, newHeader]);
    const newData = data.map(row => [...row, '']);
    setData(newData);
  };

  const deleteColumn = (index) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    const newData = data.map(row => row.filter((_, i) => i !== index));
    setHeaders(newHeaders);
    setData(newData);
  };

  const downloadCSV = () => {
    const csvContent = [
      headers.join(separator),
      ...data.map(row => row.join(separator))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'edited_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSort = (index) => {
    if (sortColumn === index) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(index);
      setSortDirection('asc');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CSV Tool</h1>
      <div className="mb-4 flex items-center space-x-2">
        <Input type="file" accept=".csv" onChange={handleFileUpload} className="mb-2" />
        <Select value={separator} onValueChange={setSeparator}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select separator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=",">Comma (,)</SelectItem>
            <SelectItem value=";">Semicolon (;)</SelectItem>
            <SelectItem value="\t">Tab (\t)</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addRow} className="mr-2"><Plus className="mr-2 h-4 w-4" /> Add Row</Button>
        <Button onClick={addColumn} className="mr-2"><Plus className="mr-2 h-4 w-4" /> Add Column</Button>
        <Button onClick={downloadCSV}><Download className="mr-2 h-4 w-4" /> Download CSV</Button>
      </div>
      {headers.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className="relative">
                  <Input
                    value={header}
                    onChange={(e) => handleHeaderEdit(index, e.target.value)}
                    className="mr-8"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-8"
                    onClick={() => handleSort(index)}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0"
                    onClick={() => deleteColumn(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Input
                      value={cell}
                      onChange={(e) => handleCellEdit(rowIndex, cellIndex, e.target.value)}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <Button variant="destructive" onClick={() => deleteRow(rowIndex)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CSVTool;
